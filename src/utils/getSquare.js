export const getSquare = (whiteBottom, colTemp, rowTemp) => {
    const col = whiteBottom ? colTemp : (7 - colTemp)
    const row = whiteBottom ? rowTemp : (7 - rowTemp)
    const file = String.fromCharCode(whiteBottom ? (97 + col) : (104 - col))
    const rank = whiteBottom ? (8 - row) : (row + 1)
    return (file + rank)
}