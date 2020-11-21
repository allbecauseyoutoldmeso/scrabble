class GamesController < ApplicationController
  def index
  end

  def tile_rack
    tiles = tiles(:tile_ids)

    render partial: 'tile_rack', locals:  {
      tiles: tiles
    }
  end

  def hand
    tiles_in_rack = tiles(:rack_tile_ids)
    remaining_tiles = tiles(:remaining_tile_ids)
    hand = tiles_in_rack + remaining_tiles.sample(7 - tiles_in_rack.count)

    render json: {
      hand: hand,
      remaining_tiles: remaining_tiles - hand
    }
  end

  def all_tiles
    render json: { tiles: Tile.all }
  end

  private

  def tiles(key)
    tile_ids = JSON.parse(params[key])
    Tile.where(id: tile_ids)
  end
end
