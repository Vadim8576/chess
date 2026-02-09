import { action, makeAutoObservable, toJS } from "mobx";
import { fb } from "../api/firebase"
import authStore from "./authStore";
import AppStore from "./AppStore";
import { squareToIndices } from "../utils/squareToIndices";



class GameStore {

  currentGameId = null
  fastOnlineGameId = null
  fastGameList = []
  // fastOnlineGameId = null
  // fastOnlineGameId = '65NH7uPgvKw44ft4euD4'

  gameData = null
  inviteLink = null
  isLoading = true


  constructor() {
    makeAutoObservable(this)
    this.initAuthListener()
  }


  initAuthListener() {
    // fb.initAuthListener(this.setIsLoading, authStore.setUserId)
  }




  setInviteUrl = action((url) => {

    this.inviteLink = url === null ? null : url
    // console.log(this.gameData)
  })

  setIsPlay = action((isPlay) => {
    this.isPlay = isPlay
  })

  setGameData = action((data) => {
    this.gameData = { ...data }
    // console.log(this.gameData)

    this.loadGame(this.gameData.boardState)



    if (!this.gameData.lastMove) return

    const first = this.gameData.lastMove.slice(0, 2)
    const second = this.gameData.lastMove.slice(2, 4)
    const from = squareToIndices(first)
    const to = squareToIndices(second)
    const lastMoveCells = [{ ...from }, { ...to }]

    // console.log(this.gameData.lastMove)
    // console.log(toJS(first), toJS(second))
    console.log(toJS(lastMoveCells))


    AppStore.setLastMoveCells(toJS(lastMoveCells))
  })

  // Оставить стерлочную функцию, чтобы не терялся контекст
  setIsLoading = action((isLoading) => {
    // console.log('this.isLoading = ', this.isLoading)
    this.isLoading = isLoading
  })

  createFastOnlineGame = action(async (creatorColor) => {
    // const chess = AppStore.createNewChess()
    // const fen = chess.fen()
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const gameId = await fb.createFastOnlineGame(fen, creatorColor)
    this.setCurrentGameId(gameId)
    this.setFastOnlineGameId(gameId)
    this.setInviteUrl(`${window.location.origin}/fastgame/${gameId}`)
  })

  setCurrentGameId = action((gameId) => {
    this.currentGameId = gameId
    console.log('Id игры = ', this.currentGameId)
  })

  setFastOnlineGameId = action((gameId) => {
    this.fastOnlineGameId = gameId
    console.log('fastOnlineGame Id = ', this.fastOnlineGameId)
  })

  loadGame = action((fen) => {
    AppStore.loadGame(fen)
  })

  gameSubscribe = action((gameId) => {
    this.setIsLoading(true)
    const unsubscribe = fb.gameSubscribe(gameId, this.setIsLoading, this.setGameData)
    return unsubscribe
  })

  // currentGameSubscribe() {
  //   // this.setGameId('65NH7uPgvKw44ft4euD4')
  //   // console.log('currentGameSubscribe')

  //   return fb.gameSubscribe('65NH7uPgvKw44ft4euD4', this.loadGame, this.setIsLoading)
  // }

  updateBoard(lastMove) {
    const newBoardState = AppStore.chess.fen()
    fb.updateBoard(this.currentGameId, newBoardState, lastMove)
  }

  removeGame(id) {
    fb.removeGame(id)
  }

  setFastGameList = action((list) => {
    this.fastGameList = list
    console.log(this.fastGameList)
  })

  getAllGamesId = action(async () => {
    const list = await fb.getAllGamesId()
    this.setFastGameList(list)
  })


  async getGameInfo(gameId) {
    return await fb.getGameInfo(gameId)
  }




}

export default new GameStore()