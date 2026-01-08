const getCellPosition = (x, y, cellSize, currentPlayer) => {
  const colTemp = Math.floor(x / cellSize)
  const rowTemp = Math.floor(y / cellSize)

  const col = currentPlayer === 'white' ? colTemp : (7 - colTemp)
  const row = currentPlayer === 'white' ? rowTemp : (7 - rowTemp)

  return [col, row]
}

export default getCellPosition