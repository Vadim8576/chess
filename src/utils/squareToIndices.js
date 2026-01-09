export const squareToIndices = (square) => {
  // Проверяем формат входной строки: ровно 2 символа, буква + цифра
  if (typeof square !== 'string' || square.length !== 2) {
    throw new Error('Invalid square format: expected "a1"–"h8"');
  }

  const colChar = square[0].toLowerCase();  // буква (a–h)
  const rowChar = square[1];             // цифра (1–8)

  // Преобразуем букву в индекс столбца: a→0, b→1, ..., h→7
  const col = colChar.charCodeAt(0) - 'a'.charCodeAt(0);
  if (col < 0 || col > 7) {
    throw new Error('Column must be a–h');
  }

  // Преобразуем цифру в индекс строки: 8→0, 7→1, ..., 1→7
  // (в массиве строка 0 — это 8-я горизонталь доски)
  const row = 8 - parseInt(rowChar, 10);
  if (row < 0 || row > 7) {
    throw new Error('Row must be 1–8');
  }

  return {row, col}
}