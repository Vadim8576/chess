export const squareToIndices = (square) => {
  // console.log(square)
  if (typeof square !== 'string' || square.length !== 2) {
    throw new Error('Invalid square format: expected "a1"–"h8"');
  }

  const colChar = square[0].toLowerCase()  // буква (a–h)
  const rowChar = square[1]             // цифра (1–8)
  const col = colChar.charCodeAt(0) - 'a'.charCodeAt(0)
  if (col < 0 || col > 7) {
    throw new Error('Column must be a–h')
  }

  const row = 8 - parseInt(rowChar, 10)
  if (row < 0 || row > 7) {
    throw new Error('Row must be 1–8')
  }

  return {row, col}
}