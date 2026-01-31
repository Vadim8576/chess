import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
import authStore from "./authStore";
import AppStore from "./AppStore";



class GameStore {

  gameId = null
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  // Оставить стерлочную функцию, чтобы не терялся контекст
  setIsLoading = (isLoading) => {
    console.log('this.isLoading = ', this.isLoading)
    console.log('isLoading = ', isLoading)
    this.isLoading = isLoading
  }

  async createNewAnonymous () {
    // const chess = AppStore.createNewChess()
    // const fen = chess.fen()
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const gameId = await fb.createNewAnonymousGame(fen)
    this.setGameId(gameId)
  }

  setGameId(gameId) {
    this.gameId = gameId
  }

  loadGame(fen) {
    AppStore.loadGame(fen)
  }

  gameSubscribe() {
    return fb.gameSubscribe(this.gameId, this.loadGame, this.setIsLoading)
  }

  currentGameSubscribe() {
    this.setGameId('65NH7uPgvKw44ft4euD4')
    // console.log('currentGameSubscribe')

    return fb.gameSubscribe('65NH7uPgvKw44ft4euD4', this.loadGame, this.setIsLoading)
  }

  updateBoard() {
    const newBoardState = AppStore.chess.fen()
    fb.updateBoard(this.gameId, newBoardState)
  }

}

export default new GameStore()