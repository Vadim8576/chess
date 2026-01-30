export const getCellPosition = (x, y, AppStore) => {
  const colTemp = Math.floor(x / AppStore.board.cellSize)
  const rowTemp = Math.floor(y / AppStore.board.cellSize)

  const col = AppStore.whiteBottom ? colTemp : (7 - colTemp)
  const row = AppStore.whiteBottom ? rowTemp : (7 - rowTemp)

  return [col, row]
}
