import { toJS } from 'mobx';
import { squareToIndices } from '../utils/squareToIndices';

export const useGameStatus = (appStore) => {

  const getGameStatus = () => {
    const player = appStore.chess.turn()
    // console.log('player = ', player)
    appStore.setGameStatus(`Ход ${player === 'w' ? 'белых' : 'чёрных'}!`)
    

    if (appStore.chess.inCheck()) {
      appStore.setGameStatus(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)
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


  return getGameStatus
}
