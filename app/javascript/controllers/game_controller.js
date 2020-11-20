import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['rack1', 'rack2']

  async initialize() {
    await this.getAllTiles()
    const hand1 = await this.getHand()
    this.renderHand({
      player: 1,
      rack: this.rack1Target,
      tiles: hand1
    })
    const hand2 = await this.getHand()
    this.renderHand({
      player: 2,
      rack: this.rack2Target,
      tiles: hand2
    })
  }

  async getHand() {
    const response = await fetch(`/games/hand?&remaining_tiles=${JSON.stringify(this.remaining_tiles)}`, {
      headers: {
        accept: 'application/json'
      }
    })

    const text = await response.text()
    const data = JSON.parse(text)
    this.remaining_tiles = data.remaining_tiles
    return data.hand
  }

  async renderHand({ player, rack, tiles }) {
    Rails.ajax({
      type: 'GET',
      url: `/games/tile_rack?player=${player}&tiles=${JSON.stringify(tiles)}`,
      success: (data, status, xhr) => {
        rack.innerHTML = xhr.response
      }
    })
  }

  async getAllTiles() {
    const response = await fetch('/games/all_tiles', {
      headers: {
        accept: 'application/json'
      }
    })

    const text = await response.text()
    const tiles = JSON.parse(text).tiles
    this.remaining_tiles = tiles
  }
}
