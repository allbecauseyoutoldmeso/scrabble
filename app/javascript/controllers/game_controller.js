import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['rack1', 'rack2']

  async initialize() {
    await this.getAllTiles()
    this.updateHand({
      player: 1,
      target: this.rack1Target
    })
    this.updateHand({
      player: 2,
      target: this.rack2Target
    })
  }

  async updateHand({ player, target }) {
    const hand = await this.getHand()
    this.renderHand({
      player: player,
      rack: target,
      tiles: hand
    })
  }

  async getHand() {
    const url = `/games/hand?&remaining_tiles=${JSON.stringify(this.remaining_tiles)}`
    const { remaining_tiles, hand } = await this.getJson({ url })
    this.remaining_tiles = remaining_tiles
    return hand
  }

  renderHand({ player, rack, tiles }) {
    Rails.ajax({
      type: 'GET',
      url: `/games/tile_rack?player=${player}&tiles=${JSON.stringify(tiles)}`,
      success: (data, status, xhr) => {
        rack.innerHTML = xhr.response
      }
    })
  }

  async getAllTiles() {
    const { tiles } = await this.getJson({ url: '/games/all_tiles' })
    this.remaining_tiles = tiles
  }

  async getJson({ url }) {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json'
      }
    })

    const text = await response.text()
    return JSON.parse(text)
  }
}
