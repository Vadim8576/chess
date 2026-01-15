import { toJS } from 'mobx';

const useGameStatus = (appStore) => {
  const getGameStatus = () => {
    const player = appStore.chess.turn()
    console.log('player = ', player)
    appStore.setGameStatus(`Ход ${player === 'w' ? 'белых' : 'чёрных'}!`)

    if (appStore.chess.inCheck()) {
      appStore.setGameStatus(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)

      // updateHistoryItem('Шах!')
    }

    if (appStore.chess.isCheckmate()) {
      appStore.setGameStatus(`Мат ${player === 'w' ? 'белым' : 'чёрным'}!`)

      // updateHistoryItem('Мат!')
    }

    if (appStore.chess.isStalemate()) {
      const status = 'Пат. Ничья!'
      appStore.setGameStatus(status)

      // updateHistoryItem('Пат!')
    }

    if (appStore.chess.isThreefoldRepetition()) {
      const status = 'Троекратное повторение. Ничья!'
      appStore.setGameStatus(status)

      // updateHistoryItem('Ничья!')
    }

    if (appStore.chess.isDraw()) {
      const status = 'Правило 50 ходов. Ничья!'
      appStore.setGameStatus(status)

      // updateHistoryItem('Ничья!')
    }


    if (appStore.chess.isGameOver()) {
      console.log('Игра окончена.')
    }
  }

  const updateHistoryItem = (status) => {
    const newHistoryList = [...appStore.historyList]
    newHistoryList.pop()
    const lastValue = { ...appStore.historyList[appStore.historyList.length - 1], status }
    newHistoryList.push({ ...lastValue })
    appStore.updateHistoryList(newHistoryList)
  }

  return [getGameStatus]
}



export default useGameStatus