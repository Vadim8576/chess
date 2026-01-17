export const getCellPosition = (x, y, appStore) => {
  const colTemp = Math.floor(x / appStore.board.cellSize)
  const rowTemp = Math.floor(y / appStore.board.cellSize)

  const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
  const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)

  return [col, row]
}
