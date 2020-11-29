class Player
  attr_accessor :points
  attr_reader :tile_rack

  def tile_rack
    @tile_rack ||= TileRack.new
  end
end
