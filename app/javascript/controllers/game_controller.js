import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['rack1', 'rack2']

  async initialize() {
    await this.getAllTiles()
    await this.fillRack1()
    await this.fillRack2()
  }

  async getAllTiles() {
    const { tiles } = await this.getJson({ url: '/games/all_tiles' })
    this.remainingTiles = tiles
  }

  async fillRack1() {
    this.fillRack(this.rack1Target)
  }

  async fillRack2() {
    this.fillRack(this.rack2Target)
  }

  async fillRack(rack) {
    const tilesInRack = this.tilesInRack(rack)
    const hand = await this.getHand(tilesInRack)

    this.renderHand({
      rack: rack,
      tiles: hand
    })
  }

  tilesInRack(rack) {
    const tiles = rack.children[0] && rack.children[0].children
    return tiles && Array.from(tiles)
  }

  async getHand(tilesInRack = []) {
    const rackTileIds = this.tileIds(tilesInRack)
    const remainingTileIds = this.tileIds(this.remainingTiles)

    const params = new URLSearchParams({
      rack_tile_ids: JSON.stringify(rackTileIds),
      remaining_tile_ids: JSON.stringify(remainingTileIds)
    })

    const url = `/games/hand?${params.toString()}`
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
