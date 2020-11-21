class GamesController < ApplicationController
  def index
  end

  def tile_rack
    tile_ids = JSON.parse(params[:tile_ids])
    tiles = Tile.where(id: tile_ids)

    render partial: 'tile_rack', locals:  {
      tiles: tiles
    }
  end

  def hand
    remaining_tile_ids = JSON.parse(params[:remaining_tile_ids])
    remaining_tiles = Tile.where(id: remaining_tile_ids)
    hand = remaining_tiles.sample(7)

    render json: {
      hand: hand,
      remaining_tiles: remaining_tiles - hand
    }
  end

  def all_tiles
    render json: { tiles: Tile.all }
  end
end
