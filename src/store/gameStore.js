import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
import authStore from "./authStore";
import AppStore from "./AppStore";



class GameStore {

  currentGameId = null
  fastOnlineGameId = '65NH7uPgvKw44ft4euD4'

  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  // Оставить стерлочную функцию, чтобы не терялся контекст
  setIsLoading = (isLoading) => {
    // console.log('this.isLoading = ', this.isLoading)
    // console.log('isLoading = ', isLoading)
    this.isLoading = isLoading
  }

  async createFastOnlineGame () {
    // const chess = AppStore.createNewChess()
    // const fen = chess.fen()
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const gameId = await fb.createFastOnlineGame(fen)
    this.setFastOnlineGameId(gameId)
  }

  setCurrentGameId(gameId) {
    this.currentGameId = gameId
  }

  setFastOnlineGameId(gameId) {
    this.fastOnlineGameId = gameId
  }

  loadGame(fen) {
    AppStore.loadGame(fen)
  }

  gameSubscribe() {
    return fb.gameSubscribe(this.fastOnlineGameId, this.loadGame, this.setIsLoading)
  }

  // currentGameSubscribe() {
  //   // this.setGameId('65NH7uPgvKw44ft4euD4')
  //   // console.log('currentGameSubscribe')

  //   return fb.gameSubscribe('65NH7uPgvKw44ft4euD4', this.loadGame, this.setIsLoading)
  // }

  updateBoard() {
    const newBoardState = AppStore.chess.fen()
    fb.updateBoard(this.currentGameId, newBoardState)
  }

}

export default new GameStore()