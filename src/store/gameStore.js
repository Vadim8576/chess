import { action, makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
import authStore from "./authStore";
import AppStore from "./AppStore";



class GameStore {

  currentGameId = null
  // fastOnlineGameId = null
  // fastOnlineGameId = '65NH7uPgvKw44ft4euD4'

  gameData = null
  inviteUrl = null
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  setInviteUrl = action((url) => {
    this.inviteUrl = `${window.location.origin}/chess-game/${this.currentGameId}`
    // console.log(this.gameData)
  })

  setGameData = action((data) => {
    this.gameData = { ...data }
    console.log(this.gameData)
  })

  // Оставить стерлочную функцию, чтобы не терялся контекст
  setIsLoading = action((isLoading) => {
    console.log('this.isLoading = ', this.isLoading)
    this.isLoading = isLoading
  })

  createFastOnlineGame = action(async () => {
    // const chess = AppStore.createNewChess()
    // const fen = chess.fen()
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const gameId = await fb.createFastOnlineGame(fen)
    this.setCurrentGameId(gameId)
  })

  setCurrentGameId = action((gameId) => {
    this.currentGameId = gameId
    console.log('Id игры = ', this.currentGameId)
  })

  // setFastOnlineGameId(gameId) {
  //   this.fastOnlineGameId = gameId
  // }

  loadGame = action((fen) => {
    AppStore.loadGame(fen)
  })

  gameSubscribe = action((gameId) => {
    const unsubscribe = fb.gameSubscribe(gameId, this.setIsLoading, this.setGameData)
    return unsubscribe
  })

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