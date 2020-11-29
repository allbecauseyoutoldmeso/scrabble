class Tile
  attr_reader :letter, :points
  attr_accessor :id

  def self.all
    tiles
  end

  def initialize(letter, points)
    @letter = letter
    @points = points
  end

  def self.where(id:)
    tiles.select do |tile|
      id.include?(tile.id)
    end
  end

  def attributes
    {
      id: id,
      letter: letter,
      points: points
    }
  end

  private

  def self.tiles
    @tiles ||= tile_attributes.each_with_index.map do |attributes, index|
      tile = Tile.new(attributes[:letter], attributes[:points])
      tile.id = index
      tile
    end
  end

  def self.tile_attributes
    Array.new(9, { letter: 'A', points: 1 }) +
    Array.new(2, { letter: 'B', points: 3 }) +
    Array.new(2, { letter: 'C', points: 3 }) +
    Array.new(4, { letter: 'D', points: 2 }) +
    Array.new(12, { letter: 'E', points: 1 }) +
    Array.new(2, { letter: 'F', points: 4 }) +
    Array.new(3, { letter: 'G', points: 2 }) +
    Array.new(2, { letter: 'H', points: 4 }) +
    Array.new(9, { letter: 'I', points: 1 }) +
    Array.new(1, { letter: 'J', points: 8 }) +
    Array.new(1, { letter: 'K', points: 5 }) +
    Array.new(4, { letter: 'L', points: 1 }) +
    Array.new(2, { letter: 'M', points: 3 }) +
    Array.new(6, { letter: 'N', points: 1 }) +
    Array.new(8, { letter: 'O', points: 1 }) +
    Array.new(2, { letter: 'P', points: 3 }) +
    Array.new(1, { letter: 'Q', points: 10 }) +
    Array.new(6, { letter: 'R', points: 1 }) +
    Array.new(4, { letter: 'S', points: 1 }) +
    Array.new(6, { letter: 'T', points: 1 }) +
    Array.new(4, { letter: 'U', points: 1 }) +
    Array.new(2, { letter: 'V', points: 4 }) +
    Array.new(2, { letter: 'W', points: 4 }) +
    Array.new(1, { letter: 'X', points: 8 }) +
    Array.new(2, { letter: 'Y', points: 4 }) +
    Array.new(1, { letter: 'Z', points: 10 }) +
    Array.new(2, { letter: '', points: 0 })
  end
end
