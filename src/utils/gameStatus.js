export const gameStatus = (appStore) => {
  const player = appStore.chess.turn()
  appStore.setGameStatus(`Ход ${player === 'w' ? 'белых' : 'чёрных'}!`)

  if (appStore.chess.inCheck()) {
    appStore.setGameStatus(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)
  }

  if (appStore.chess.isCheckmate()) {
    appStore.setGameStatus(`Мат ${player === 'w' ? 'белым' : 'чёрным'}!`)
  }

  if (appStore.chess.isStalemate()) {
    const status = 'Пат. Ничья!'
    appStore.setGameStatus(status)
  }

  if (appStore.chess.isThreefoldRepetition()) {
    // const status = 'Троекратное повторение. Ничья!'
    const status = 'Ничья!'
    appStore.setGameStatus(status)
  }

  if (appStore.chess.isDraw()) {
    // const status = 'Правило 50 ходов. Ничья!'
    const status = 'Ничья!'
    appStore.setGameStatus(status)
  }

  if (appStore.chess.isDrawByFiftyMoves()) {
    const status = 'Ничья!'
    appStore.setGameStatus(status)
  }
 
  if (appStore.chess.isInsufficientMaterial()) {
    const status = 'Ничья!'
    appStore.setGameStatus(status)
  }

  if (appStore.chess.isInsufficientMaterial()) {
    const status = 'Ничья!'
    appStore.setGameStatus(status)
  }

  if (appStore.chess.isGameOver()) {
    console.log('Игра окончена!')
  }
}