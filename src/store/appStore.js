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

  constructor() {
    makeAutoObservable(this)
  }

  setGameType(type) {
    this.gameType = type
  }

  createNewChess() {
    this.chess = new Chess()
  }

  setChess(chess) {
    this.chess = chess
  }

  initVariables() {
    this.historyMoves = []
    this.historyList = []
    this.status = ''
  }

  loadGame(fen) {
    this.chess = new Chess()
    this.chess.load(fen)
    console.log('load game ', fen)
  }

  restartGame() {
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

  }

  setBoard(board) {
    this.board = { ...this.board, ...board }
    // console.log('board = ', toJS(this.board))
  }

  setStatus = action((status) => {
    this.status = status
  })



  setLastMoveCells(cells) {
    this.lastMoveCells = cells
    // console.log(toJS(this.lastMoveCells))
  }

  setPossibleMoves(cells) {
    this.possibleMoves = cells
    // console.log(toJS(this.possibleMoves))
  }

  setCellInCheck(cell) {
    this.cellInCheck = cell
    // console.log(toJS(this.cellInCheck))
  }

  removeHightLightCells() {
    this.setLastMoveCells([])
    this.setPossibleMoves([])
    this.setCellInCheck({})
  }





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


  resetCapturedFigures() {

    if (this.capturedFigures[gameStore.currentGameId]) delete this.capturedFigures[gameStore.currentGameId]

    console.log(toJS(this.capturedFigures))
    // this.capturedFigures[gameStore.currentGameId] = {}

    console.log(toJS(this.capturedFigures))
    this.saveCapturedFiguresToLocalStorage()
  }

  setCapturedFigures(capturedFigures) {
    // this.capturedFigures[gameStore.currentGameId] = capturedFigures
    this.capturedFigures = { ...capturedFigures }
    
  }

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

  loadCapturedFiguresFromLocalStorage() {
    const capturedFigures = localStorage.getItem('CapturedFigures')
    if (capturedFigures) this.setCapturedFigures(JSON.parse(capturedFigures))
    console.log(capturedFigures)
  }








  saveGameToLocalStorage() {
    const fen = this.chess.fen()
    try {
      localStorage.setItem('ChessFen', JSON.stringify(fen))
    } catch (e) {
      console.log('Не удалось сохранить fen в localStorage: ', e)
    }
  }

  loadGameFromLocalStorage() {
    const fen = localStorage.getItem('ChessFen')
    if (fen) this.chess.load(JSON.parse(fen))
  }

  saveSettingToLocalStorage(setting) {
    // const oldSetting = localStorage.getItem('Setting') || {}
    // console.log(oldSetting)
    // oldSetting = JSON.parse(oldSetting)

    // console.log(JSON.parse(oldSetting))

    const newSetting = { ...setting }

    console.log(newSetting)

    try {
      localStorage.setItem('Setting', JSON.stringify(newSetting))
    } catch (e) {
      console.log('Не удалось сохранить настройки в localStorage: ', e)
    }
  }

  setSettingFromLocalStorage() {
    const setting = localStorage.getItem('Setting')
    if (!setting) return
    const parseSetting = JSON.parse(setting)
    // console.log('parseSetting = ', parseSetting)
    if ('whiteBottom' in parseSetting) {
      this.whiteBottom = parseSetting.whiteBottom
    }

    // console.log(this.whiteBottom)
  }

  rotateBoard() {
    this.whiteBottom = !this.whiteBottom
    this.saveSettingToLocalStorage({ whiteBottom: this.whiteBottom })
  }









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