import { action, makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";
import gameStore from "./gameStore";
import { gameStatus } from "../utils/gameStatus";



class AppStore {
  chess = new Chess()

  // Сверять hash по сети
  // hash = chess.hash()
  // -> '3436f01fd716346e'
  gameType = '' // 'localGame' | 'fastGame' | 'rateGame'

  board = {
    cellSize: 0,
    borderSize: 0
  }
  // capturedFigures = {
  //   'w': [],
  //   'b': []
  // }
  capturedFigures = {}

  historyMoves = []
  historyList = []
  whiteBottom = true // true | false
  status = ''

  lastMoveCells = []
  possibleMoves = []
  cellInCheck = {}

  currentPage = '' // 'home' || 'local' || 'gamelist' || 'fastgame' || 'lobby' || 'rategame'

  constructor() {
    makeAutoObservable(this)
  }



  setCurrentPage = action((page) => {
    this.currentPage = page
  })

  setGameType = action((type) => {
    this.gameType = type
  })

  createNewChess = action(() => {
    this.chess = new Chess()
  })

  setChess = action((chess) => {
    this.chess = chess
  })

  initVariables = action(() => {
    this.historyMoves = []
    this.historyList = []
    this.status = ''
  })

  loadGame(fen) {
    this.chess = new Chess()
    this.chess.load(fen)
    gameStatus(this)
    console.log('Создан новый объект Chess, в него загружен fen ', fen)
  }

  restartGame = action(() => {
    try {
      localStorage.removeItem('ChessFen')
      this.chess = new Chess()
      this.initVariables()
      this.removeHightLightCells()
      this.resetCapturedFigures()
      gameStatus(this)
    } catch (e) {
      console.log('Не удалось удалить fen из localStorage: ', e)
    }
  })

  setBoard = action((board) => {
    this.board = { ...this.board, ...board }
  })

  setStatus = action((status) => {
    this.status = status
  })



  setLastMoveCells = action((cells) => {
    this.lastMoveCells = cells
    // console.log(toJS(this.lastMoveCells))
  })

  setPossibleMoves = action((cells) => {
    this.possibleMoves = cells
    // console.log(toJS(this.possibleMoves))
  })

  setCellInCheck = action((cell) => {
    this.cellInCheck = cell
    // console.log(toJS(this.cellInCheck))
  })

  removeHightLightCells = action(() => {
    this.setLastMoveCells([])
    this.setPossibleMoves([])
    this.setCellInCheck({})
  })





  //Взятые фигуры
  addCapturedFigures = action((color, figure) => {

    console.log('currentGameId = ', gameStore.currentGameId)
    console.log('color = ', color)
    console.log('figure = ', figure)
    console.log(toJS(this.capturedFigures))

    const gameId = gameStore.currentGameId;

    this.capturedFigures = {
      ...this.capturedFigures,
      [gameId]: {
        ...this.capturedFigures[gameId],
        [color]: [
          ...(this.capturedFigures[gameId]?.[color] || []),
          figure
        ]
      }
    }


    console.log(toJS(this.capturedFigures))

    this.saveCapturedFiguresToLocalStorage()
  })


  resetCapturedFigures = action(() => {

    if (this.capturedFigures[gameStore.currentGameId]) delete this.capturedFigures[gameStore.currentGameId]

    console.log(toJS(this.capturedFigures))
    // this.capturedFigures[gameStore.currentGameId] = {}

    console.log(toJS(this.capturedFigures))
    this.saveCapturedFiguresToLocalStorage()
  })

  setCapturedFigures = action((capturedFigures) => {
    // this.capturedFigures[gameStore.currentGameId] = capturedFigures
    this.capturedFigures = { ...capturedFigures }
    
  })

  saveCapturedFiguresToLocalStorage() {
    // const capturedFigures = {
    //   [gameStore.currentGameId]: { ...this.capturedFigures }
    // }
    try {
      localStorage.setItem('CapturedFigures', JSON.stringify(this.capturedFigures))
    } catch (e) {
      console.log('Не удалось сохранить CapturedFigures в localStorage: ', e)
    }
  }

  loadCapturedFiguresFromLocalStorage = action(() => {
    const capturedFigures = localStorage.getItem('CapturedFigures')
    if (capturedFigures) this.setCapturedFigures(JSON.parse(capturedFigures))
    console.log(capturedFigures)
  })








  saveGameToLocalStorage() {
    const fen = this.chess.fen()
    try {
      localStorage.setItem('ChessFen', JSON.stringify(fen))
    } catch (e) {
      console.log('Не удалось сохранить fen в localStorage: ', e)
    }
  }

  loadGameFromLocalStorage = action(() => {
    const fen = localStorage.getItem('ChessFen')
    if (fen) this.loadGame(JSON.parse(fen))
  })

  saveSettingToLocalStorage(setting) {
    const newSetting = { ...setting }

    console.log(newSetting)

    try {
      localStorage.setItem('Setting', JSON.stringify(newSetting))
    } catch (e) {
      console.log('Не удалось сохранить настройки в localStorage: ', e)
    }
  }

  setSettingFromLocalStorage = action(() => {
    const setting = localStorage.getItem('Setting')
    if (!setting) return
    const parseSetting = JSON.parse(setting)
    // console.log('parseSetting = ', parseSetting)
    if ('whiteBottom' in parseSetting) {
      this.whiteBottom = parseSetting.whiteBottom
    }

    // console.log(this.whiteBottom)
  })

  rotateBoard = action(() => {
    this.whiteBottom = !this.whiteBottom
    this.saveSettingToLocalStorage({ whiteBottom: this.whiteBottom })
  })









  // не используются!
  updateHistoryMoves(newHistoryMove) {
    this.historyMoves = [...this.historyMoves, newHistoryMove]
    console.log(toJS(this.historyMoves))
  }

  updateHistoryList() {
    const historyList = this.chess.history({ verbose: true })
    // console.log(historyList)
    if (historyList.length === 0) return
    const history = historyList[historyList.length - 1]

    const historyMove = {
      move: `${history.from}-${history.to}`,
      color: history.color
    }

    this.historyList = [...this.historyList, historyMove]
  }
}

export default new AppStore()