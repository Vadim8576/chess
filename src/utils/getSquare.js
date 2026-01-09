export const getSquare = (currentPlayer, colTemp, rowTemp) => {
    const col = currentPlayer === 'white' ? colTemp : (7 - colTemp)
    const row = currentPlayer === 'white' ? rowTemp : (7 - rowTemp)
    const file = String.fromCharCode(currentPlayer === 'white' ? (97 + col) : (104 - col))
    const rank = currentPlayer === 'white' ? (8 - row) : (row + 1)
    return file + rank
}