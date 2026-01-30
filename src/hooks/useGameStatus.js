import { toJS } from 'mobx';
import { squareToIndices } from '../utils/squareToIndices';

export const useGameStatus = (AppStore) => {

  const getGameStatus = () => {
    const player = AppStore.chess.turn()
    // console.log('player = ', player)
    AppStore.setGameStatus(`Ход ${player === 'w' ? 'белых' : 'чёрных'}!`)
    

    if (AppStore.chess.inCheck()) {
      AppStore.setGameStatus(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)
    }

    if (AppStore.chess.isCheckmate()) {
      AppStore.setGameStatus(`Мат ${player === 'w' ? 'белым' : 'чёрным'}!`)

      // updateHistoryItem('Мат!')
    }

    if (AppStore.chess.isStalemate()) {
      const status = 'Пат. Ничья!'
      AppStore.setGameStatus(status)

      // updateHistoryItem('Пат!')
    }

    if (AppStore.chess.isThreefoldRepetition()) {
      const status = 'Троекратное повторение. Ничья!'
      AppStore.setGameStatus(status)

      // updateHistoryItem('Ничья!')
    }

    if (AppStore.chess.isDraw()) {
      const status = 'Правило 50 ходов. Ничья!'
      AppStore.setGameStatus(status)

      // updateHistoryItem('Ничья!')
    }


    if (AppStore.chess.isGameOver()) {
      console.log('Игра окончена.')
    }
  }


  return getGameStatus
}
