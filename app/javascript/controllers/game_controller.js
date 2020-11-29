import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [
    'rack1',
    'rack2',
    'board',
    'player1Points',
    'player2Points'
  ]

  async initialize() {
    await this.getAllTiles()
    await this.fillRack1()
    await this.fillRack2()
  }

  submitPlayer1Word() {

  }

  submitPlayer2Word() {

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
    return this.tiles(rack) && Array.from(this.tiles(rack))
  }

  tiles(rack) {
    return rack.children[0] && rack.children[0].children
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
        this.updateTurn()
        this.tagTiles(rack)
      }
    })
  }

  tagTiles(rack) {
    const tiles = this.tilesInRack(rack)
    tiles.forEach((tile) => {
      tile.setAttribute('data-turn', this.turn)
      tile.setAttribute('data-player', this.player)
    })
  }

  updateTurn() {
    this.turn = (this.turn || 0) + 1
    this.player = this.player !== 1 ? 1 : 2
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
