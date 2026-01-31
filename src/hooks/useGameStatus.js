import { toJS } from 'mobx';
import { squareToIndices } from '../utils/squareToIndices';

export const useGameStatus = (AppStore) => {

  const getGameStatus = () => {
    const player = AppStore.chess.turn()
    // console.log('player = ', player)
    AppStore.setStatus(`Ход ${player === 'w' ? 'белых' : 'чёрных'}!`)
    

    if (AppStore.chess.inCheck()) {
      AppStore.setStatus(`Шах ${player === 'w' ? 'белым' : 'чёрным'}!`)
    }

    if (AppStore.chess.isCheckmate()) {
      AppStore.setStatus(`Мат ${player === 'w' ? 'белым' : 'чёрным'}!`)

      // updateHistoryItem('Мат!')
    }

    if (AppStore.chess.isStalemate()) {
      const status = 'Пат. Ничья!'
      AppStore.setStatus(status)

      // updateHistoryItem('Пат!')
    }

    if (AppStore.chess.isThreefoldRepetition()) {
      const status = 'Троекратное повторение. Ничья!'
      AppStore.setStatus(status)

      // updateHistoryItem('Ничья!')
    }

    if (AppStore.chess.isDraw()) {
      const status = 'Правило 50 ходов. Ничья!'
      AppStore.setStatus(status)

      // updateHistoryItem('Ничья!')
    }


    if (AppStore.chess.isGameOver()) {
      console.log('Игра окончена.')
    }
  }


  return getGameStatus
}
