import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['rack1', 'rack2']

  async initialize() {
    await this.getAllTiles()
    await this.getHand(1, this.rack1Target)
    await this.getHand(2, this.rack2Target)
  }

  async getHand(player, rack) {
    Rails.ajax({
      type: 'GET',
      url: `/games/new_hand?player=${player}&remaining_tiles=${JSON.stringify(this.remaining_tiles)}`,
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

    const data = await response.text()
    const tiles = JSON.parse(data).tiles
    this.remaining_tiles = tiles
  }
}
