class GamesController < ApplicationController
  def index
  end

  def tile_rack
    tiles = JSON.parse(params[:tiles])
    player = params[:player]

    render partial: 'tile_rack', locals:  {
      tiles: tiles,
      player: player
    }
  end

  def hand
    remaining_tiles = JSON.parse(params[:remaining_tiles])
    hand = remaining_tiles.sample(7)

    render json: {
      hand: hand,
      remaining_tiles: remaining_tiles - hand
    }
  end

  def all_tiles
    render json: { tiles: tiles }
  end

  private

  def tiles
    Array.new(9, {letter: 'A', points: 1}) +
    Array.new(2, {letter: 'B', points: 3}) +
    Array.new(2, {letter: 'C', points: 3}) +
    Array.new(4, {letter: 'D', points: 2}) +
    Array.new(12, {letter: 'E', points: 1}) +
    Array.new(2, {letter: 'F', points: 4}) +
    Array.new(3, {letter: 'G', points: 2}) +
    Array.new(2, {letter: 'H', points: 4}) +
    Array.new(9, {letter: 'I', points: 1}) +
    Array.new(1, {letter: 'J', points: 8}) +
    Array.new(1, {letter: 'K', points: 5}) +
    Array.new(4, {letter: 'L', points: 1}) +
    Array.new(2, {letter: 'M', points: 3}) +
    Array.new(6, {letter: 'N', points: 1}) +
    Array.new(8, {letter: 'O', points: 1}) +
    Array.new(2, {letter: 'P', points: 3}) +
    Array.new(1, {letter: 'Q', points: 10}) +
    Array.new(6, {letter: 'R', points: 1}) +
    Array.new(4, {letter: 'S', points: 1}) +
    Array.new(6, {letter: 'T', points: 1}) +
    Array.new(4, {letter: 'U', points: 1}) +
    Array.new(2, {letter: 'V', points: 4}) +
    Array.new(2, {letter: 'W', points: 4}) +
    Array.new(1, {letter: 'X', points: 8}) +
    Array.new(2, {letter: 'Y', points: 4}) +
    Array.new(1, {letter: 'Z', points: 10}) +
    Array.new(2, {letter: '', points: 0})
  end
end
