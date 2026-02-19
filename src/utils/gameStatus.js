export const gameStatus = (AppStore) => {
  if(!AppStore.chess) return
  const player = AppStore.chess.turn()
  // console.log('gameStatus!!!!!!!!!!!!!!!!', player)
  AppStore.setStatusMessage(`Ход ${player === 'w' ? 'белых' : 'чёрных'}`)

  if (AppStore.chess.inCheck()) {
    AppStore.setStatusMessage(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)
  }

  if (AppStore.chess.isCheckmate()) {
    AppStore.setStatusMessage(`Мат ${player === 'w' ? 'белым' : 'чёрным'}!`)
    AppStore.setGameStatus('finished')
  }

  if (AppStore.chess.isStalemate()) {
    const status = 'Пат. Ничья!'
    AppStore.setStatusMessage(status)
    AppStore.setGameStatus('finished')
  }

  if (AppStore.chess.isThreefoldRepetition()) {
    // const status = 'Троекратное повторение. Ничья!'
    const status = 'Ничья! Троекратное повторение'
    AppStore.setStatusMessage(status)
    AppStore.setGameStatus('finished')
  }

  if (AppStore.chess.isDrawByFiftyMoves()) {
    const status = 'Ничья!3'
    AppStore.setStatusMessage(status)
    AppStore.setGameStatus('finished')
  }
 
  if (AppStore.chess.isInsufficientMaterial()) {
    const status = 'Ничья!4'
    AppStore.setStatusMessage(status)
    AppStore.setGameStatus('finished')
  }

  if (AppStore.agreedDraw) {
    const status = 'Ничья по соглашению!'
    AppStore.setStatusMessage(status)
    AppStore.setGameStatus('finished')
  }

  if (AppStore.chess.isGameOver()) {
    console.log('Игра окончена!')
    AppStore.setGameStatus('finished')
  }
}