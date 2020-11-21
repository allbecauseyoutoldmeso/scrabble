import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['rack1', 'rack2']

  async initialize() {
    await this.getAllTiles()
    this.dealInitialHands()
  }

  refillRack1() {

  }

  refillRack2() {

  }

  dealInitialHands() {
    this.updateHand({
      target: this.rack1Target
    })
    this.updateHand({
      target: this.rack2Target
    })
  }

  async updateHand({ target }) {
    const hand = await this.getHand()

    this.renderHand({
      rack: target,
      tiles: hand
    })
  }

  async getHand() {
    const tileIds = this.tileIds(this.remainingTiles)
    const url = `/games/hand?&remaining_tile_ids=${JSON.stringify(tileIds)}`
    const { remainingTiles, hand } = await this.getJson({ url })
    this.remainingTiles = remainingTiles
    return hand
  }

  renderHand({ rack, tiles }) {
    const tileIds = this.tileIds(tiles)

    Rails.ajax({
      type: 'GET',
      url: `/games/tile_rack?&tile_ids=${JSON.stringify(tileIds)}`,
      success: (data, status, xhr) => {
        rack.innerHTML = xhr.response
      }
    })
  }

  tileIds(tiles) {
    return tiles.map((tile) => tile.id)
  }

  async getAllTiles() {
    const { tiles } = await this.getJson({ url: '/games/all_tiles' })
    this.remainingTiles = tiles
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
