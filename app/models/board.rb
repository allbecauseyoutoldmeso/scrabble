class Board
  def columns
    Array.new(15) do |y|
      column(y)
    end
  end

  def rows
    Array.new(15) do |x|
      row(x)
    end
  end

  def row(x)
    squares.select do |square|
      square.x == x
    end
  end

  def column(y)
    squares.select do |square|
      square.y == y
    end
  end

  def squares
    @squares ||= Array.new(15) do |x|
      Array.new(15) do |y|
        Square.new(x, y)
      end
    end.flatten
  end
end
