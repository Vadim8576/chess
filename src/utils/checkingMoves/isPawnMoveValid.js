// Пешка

export const isPawnMoveValid = (board, fromRow, fromCol, toRow, toCol, gameState) => {
  const piece = board[fromRow][fromCol];
  if (!piece || !piece.includes('p')) return false; // Не пешка

  const isWhite = piece.includes('w');
  const direction = isWhite ? -1 : 1; // Направление хода
  const startRow = isWhite ? 6 : 1;    // Начальная строка
  const promotionRow = isWhite ? 0 : 7; // Строка превращения

  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);

  // 1. Проверка базовых ограничений
  if (rowDiff === 0 || Math.abs(rowDiff) > 2) return false; // Нельзя стоять или прыгать >2
  if (colDiff > 1) return false;                          // Нельзя ходить >1 по горизонтали

  // 2. Простой ход (без взятия)
  if (colDiff === 0) {
    // Ход на 1 клетку
    if (rowDiff === direction) {
      return board[toRow][toCol] === '  '; // Поле должно быть пустым
    }

    // Ход на 2 клетки (только с начальной строки)
    if (rowDiff === 2 * direction && fromRow === startRow) {
      const intermediateRow = fromRow + direction;
      return (
        board[intermediateRow][toCol] === '  ' && // Промежуточная клетка свободна
        board[toRow][toCol] === '  '           // Конечная клетка свободна
      );
    }
    return false;
  }

  // 3. Взятие (по диагонали)
  if (colDiff === 1 && rowDiff === direction) {
    const targetPiece = board[toRow][toCol];

    // Обычное взятие: фигура противника
    if (targetPiece !== '  ' && targetPiece.includes(isWhite ? 'b' : 'w')) {
      // Проверка превращения
      if (toRow === promotionRow) {
        return gameState.promotion !== false; // Должен быть выбран тип превращения
      }
      return true;
    }

    // Взятие на проходе (en passant)
    if (targetPiece === '  ') { // Поле пусто — проверяем en passant
      const epTargetCol = toCol;
      const epTargetRow = fromRow; // Пешка противника только что сделала двойной ход
      const enPassantSquare = gameState.enPassant; // {row, col} или null


      return (
        enPassantSquare &&
        enPassantSquare.row === epTargetRow &&
        enPassantSquare.col === epTargetCol
      );
    }
    return false;
  }

  // 4. Превращение (если дошли до последней горизонтали)
  if (toRow === promotionRow && (colDiff === 0 || colDiff === 1)) {
    // Уже проверено выше: для взятия colDiff=1, для простого хода colDiff=0
    return gameState.promotion !== false; // Должно быть указано, во что превращаемся
  }

  return false; // Все остальные случаи — некорректны
}
