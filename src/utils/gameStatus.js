export const gameStatus = (AppStore) => {
  if(!AppStore.chess) return
  const player = AppStore.chess.turn()
  // console.log('gameStatus!!!!!!!!!!!!!!!!', player)
  AppStore.setStatus(`Ход ${player === 'w' ? 'белых' : 'чёрных'}!`)

  if (AppStore.chess.inCheck()) {
    AppStore.setStatus(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)
  }

  if (AppStore.chess.isCheckmate()) {
    AppStore.setStatus(`Мат ${player === 'w' ? 'белым' : 'чёрным'}!`)
  }

  if (AppStore.chess.isStalemate()) {
    const status = 'Пат. Ничья!'
    AppStore.setStatus(status)
  }

  if (AppStore.chess.isThreefoldRepetition()) {
    // const status = 'Троекратное повторение. Ничья!'
    const status = 'Ничья!'
    AppStore.setStatus(status)
  }

  if (AppStore.chess.isDraw()) {
    // const status = 'Правило 50 ходов. Ничья!'
    const status = 'Ничья!'
    AppStore.setStatus(status)
  }

  if (AppStore.chess.isDrawByFiftyMoves()) {
    const status = 'Ничья!'
    AppStore.setStatus(status)
  }
 
  if (AppStore.chess.isInsufficientMaterial()) {
    const status = 'Ничья!'
    AppStore.setStatus(status)
  }

  if (AppStore.chess.isInsufficientMaterial()) {
    const status = 'Ничья!'
    AppStore.setStatus(status)
  }

  if (AppStore.chess.isGameOver()) {
    console.log('Игра окончена!')
  }
}