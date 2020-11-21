import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['rack1', 'rack2']

  async initialize() {
    await this.getAllTiles()
    this.dealInitialHands()
  }

  async refillRack1() {
    this.refillRack(this.rack1Target)
  }

  async refillRack2() {
    this.refillRack(this.rack2Target)
  }

  async refillRack(rack) {
    const tiles = this.tilesInRack(rack)
    const hand = await this.getHand(tiles)

    this.renderHand({
      rack: rack,
      tiles: hand
    })
  }

  tilesInRack(rack) {
    return Array.from(rack.children[0].children)
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

  async getHand(tilesInRack = []) {
    const rackTileIds = this.tileIds(tilesInRack)
    const remainingTileIds = this.tileIds(this.remainingTiles)
    const url = `/games/hand?remaining_tile_ids=${JSON.stringify(remainingTileIds)}&rack_tile_ids=${JSON.stringify(rackTileIds)}`
    const { remaining_tiles, hand } = await this.getJson({ url })
    this.remainingTiles = remaining_tiles
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
