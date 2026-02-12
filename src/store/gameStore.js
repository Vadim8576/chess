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

  showDrawDialog = false


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


    if (this.gameData.drawOffer) {
      const parts = this.gameData.drawOffer.split('-')
      const userId = parts[0] // id
      const draw = parts[1] // result

      console.log(userId, draw)


      const currentUserId = authStore.creatorUid || authStore.joinerUid

      console.log(currentUserId)


      // если в запросе ничьи не твой id, у тебя просят ничью
      if (currentUserId !== userId) {
        if (draw === 'draw') {
          this.showDrawDialog = true // для показа диалога
          return // если это запрос, показываем только диалог
        }

        if (draw === 'ok') { // Соперник согласился на ничью
          console.log('Соперник согласился на ничью')
        }

        if (draw === 'cancel') { // Соперник отказал в ниьей
          console.log('Соперник отказал в ниьей')
        }
      }



      return
    }






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


  drawOffer(draw) {
    fb.drawOffer(this.currentGameId, draw)
  }



}

export default new GameStore()