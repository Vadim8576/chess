
const useGameStatus = (appStore) => {
  const getGameStatus = () => {
    appStore.setGameStatus('w', '')
    appStore.setGameStatus('b', '')
    const player = appStore.chess.turn()
    appStore.setGameStatus(player, 'Ваш ход!')
    const contender = player === 'w' ? 'b' : 'w'
    appStore.setGameStatus(contender, `Ход ${contender === 'b' ? 'белых' : 'черных'}!`)

    if (appStore.chess.inCheck()) {
      appStore.setGameStatus(player, 'Шах!')
    }

    if (appStore.chess.isCheckmate()) {
      appStore.setGameStatus(player, 'Мат!')

    }

    if (appStore.chess.isStalemate()) {
      const status = 'Пат. Ничья!'
      appStore.setGameStatus('w', status)
      appStore.setGameStatus('b', status)
    }

    if (appStore.chess.isThreefoldRepetition()) {
      const status = 'Троекратное повторение. Ничья!'
      appStore.setGameStatus('w', status)
      appStore.setGameStatus('b', status)
    }

    if (appStore.chess.isDraw()) {
      const status = 'Правило 50 ходов. Ничья!'
      appStore.setGameStatus('w', status)
      appStore.setGameStatus('b', status)
    }


    if (appStore.chess.isGameOver()) {
      console.log('Игра окончена.')
    }
  }
  return [getGameStatus]
}

export default useGameStatus