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

  currentPlayerColor = null

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

  setCurrentPlayerColor = action((color) => {
    this.currentPlayerColor = color
  })

  setGameData = action((data) => {
    this.gameData = { ...data }
    // console.log(this.gameData)

    AppStore.loadGame(this.gameData.boardState)
    // this.loadGame(this.gameData.boardState)


    

    if (this.gameData.capturedFigures.length > 0) {
      const capturedFigures = this.gameData.capturedFigures.map(cf => cf.split('/')[0]) // Обрезаем Id
      AppStore.setCapturedFigures(capturedFigures)
    }

    // console.log('------------------')
    // console.log('creator id', authStore.creatorUid)
    // console.log('joiner id', authStore.joinerUid)
    // console.log('id black player', this.gameData.blackPlayerUid)
    // console.log('id white player', this.gameData.whitePlayerUid)
    // console.log('capturedFigures', this.gameData.capturedFigures)
    // console.log('------------------')

    // Определяем цвет текущего игрока
    if (authStore.creatorUid) {
      if (authStore.creatorUid === this.gameData.whitePlayerUid) {
        this.setCurrentPlayerColor('w')
        AppStore.setWhiteBottom(true)
      } else if (authStore.creatorUid === this.gameData.blackPlayerUid) {
        this.setCurrentPlayerColor('b')
        AppStore.setWhiteBottom(false)
      }
    } else {
      if (authStore.joinerUid === this.gameData.whitePlayerUid) {
        this.setCurrentPlayerColor('w')
        AppStore.setWhiteBottom(true)
      } else if (authStore.joinerUid === this.gameData.blackPlayerUid) {
        this.setCurrentPlayerColor('b')
        AppStore.setWhiteBottom(false)
      }
    }




    // не подсвечиваем последний сетевой ход, если сейчас локальная игра
    if (!this.gameData.lastMove || AppStore.gameType === 'local') return

    const lastMove = this.gameData.lastMove.split('/')[0] // Удаляем id
    const first = lastMove.slice(0, 2)
    const second = lastMove.slice(2, 4)
    const from = squareToIndices(first)
    const to = squareToIndices(second)
    const lastMoveCells = [{ ...from }, { ...to }]

    // console.log(this.gameData.lastMove)
    // console.log(toJS(first), toJS(second))
    // console.log(toJS(lastMoveCells))


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

  // loadGame = action((fen) => {
  //   AppStore.loadGame(fen)
  // })

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

  updateBoard(data) {
    const newBoardState = AppStore.chess.fen()
    fb.updateBoard(this.currentGameId, { ...data, newBoardState })
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