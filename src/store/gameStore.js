import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
import authStore from "./authStore";
import AppStore from "./AppStore";



class GameStore {

  gameId = null

  constructor() {
    makeAutoObservable(this)
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
    return fb.gameSubscribe(this.gameId, this.loadGame)
  }

  currentGameSubscribe() {
    this.setGameId('65NH7uPgvKw44ft4euD4')
    console.log('currentGameSubscribe')
    return fb.gameSubscribe('65NH7uPgvKw44ft4euD4', this.loadGame)
  }

  updateBoard() {
    const newBoardState = AppStore.chess.fen()
    fb.updateBoard(this.gameId, newBoardState)
  }

}

export default new GameStore()