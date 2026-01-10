export const getCellPosition = (x, y, cellSize, whiteBottom) => {
  const colTemp = Math.floor(x / cellSize)
  const rowTemp = Math.floor(y / cellSize)

  const col = whiteBottom ? colTemp : (7 - colTemp)
  const row = whiteBottom ? rowTemp : (7 - rowTemp)

  return [col, row]
}
