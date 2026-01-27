
export const getLastMove = (appStore) => {
  const history = appStore.chess.history({ verbose: true });
  
  if (history.length === 0) {
    console.log('Ходов ещё не было');
    return null;
  }

  const lastMove = history[history.length - 1];

  console.log('Последний ход:');
  console.log(`  Фигура: ${lastMove.piece}`);
  console.log(`  Цвет: ${lastMove.color}`);
  console.log(`  С клетки: ${lastMove.from}`);
  console.log(`  На клетку: ${lastMove.to}`);
  console.log(`  Запись (SAN): ${lastMove.san}`);
  console.log(`  Флаги: ${lastMove.flags}`);

  return lastMove;
}