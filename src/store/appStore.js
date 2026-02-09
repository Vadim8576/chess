import { action, makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";
import gameStore from "./gameStore";
import { gameStatus } from "../utils/gameStatus";
import { squareToIndices } from "../utils/squareToIndices";
import { COLORS } from "../constants/gameInitial";



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
  promotion = null

  historyMoves = []
  historyList = []
  whiteBottom = true // true | false
  statusMessage = ''
  gameStatus = 'playing'

  lastMoveCells = []
  possibleMoves = []
  cellInCheck = {}

  currentPage = '' // 'home' || 'local' || 'gamelist' || 'fastgame' || 'lobby' || 'rategame'

  constructor() {
    makeAutoObservable(this)
  }




  checkingMove = action((capturedFigure, moveSquares) => {

    const { startSquare, finishSquare } = moveSquares
    const possibleMoves = this.chess.moves({ verbose: true })

    // console.log(startSquare, finishSquare)
    // console.log(toJS(possibleMoves))

    const move = possibleMoves.find(m => m.from === startSquare && m.to === finishSquare)

    if (!move) {
      console.log('Некорректный ход')
      return
    }




    // if (move && move.flags.includes('e')) {
    if (move && move.isEnPassant()) {
      console.log('Взятие на проходе!')
      capturedFigure = {
        type: 'p',
        color: move.color === 'w' ? 'b' : 'w'
      }
    }

    const moveSquaresWithCapturedFigure = { ...moveSquares, capturedFigure }

    if (move.isPromotion()) {
      console.log(`Превращение: ${move.from} → ${move.to} (в ${move.promotion})`)
      this.setPromotion(moveSquaresWithCapturedFigure)
      return
    }

    this.makeMove(moveSquaresWithCapturedFigure)

  })



  makeMove = action((moveSquares, promoteTo = undefined) => {
    const { startSquare, finishSquare, capturedFigure } = moveSquares

    console.log('Ход')
    this.chess.move({
      from: startSquare,
      to: finishSquare,
      promotion: promoteTo // 'q', 'r', 'b', 'n' || undefined
    })

    const lastMove = `${startSquare}${finishSquare}`

    this.updateKingCheckHighlight()
    gameStatus(this)
    this.setPromotion(null)


    if (this.gameType === 'local') {
      this.saveGameToLocalStorage()
      if (capturedFigure != null || capturedFigure != undefined) {
        this.addCapturedFigures(capturedFigure.color, `${capturedFigure.type}${capturedFigure.color}`)
      }
      return
    }


    gameStore.updateBoard(lastMove) // обновить доску в Firebase
  })


  setPromotion = action((promotion) => {
    this.promotion = promotion
  })





  updateKingCheckHighlight = action(() => {
    if (this.chess.inCheck() || this.chess.isCheckmate()) {
      const player = this.chess.turn() // чей сейчас ход
      const squareArr = this.chess.findPiece({ type: 'k', color: player }) // ищем клетку на котором король
      console.log('Клетка с королем =', squareArr)

      if (squareArr.length !== 1) return

      const cellIndices = squareToIndices(squareArr[0])
      console.log('король на: ', cellIndices)
      this.setCellInCheck({ cell: { ...cellIndices }, color: COLORS.errorCell, visible: true })
    } else {
      this.setCellInCheck(state => ({ ...state, visible: false }))
    }
  })



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
    this.statusMessage = ''
  })

  loadGame(fen) {
    // this.chess = new Chess()
    this.chess.load(fen)
    gameStatus(this)
    // console.log('Создан новый объект Chess, в него загружен fen ', fen)
    console.log('загружен fen ', fen)
    this.setLastMoveCells([])
    this.updateKingCheckHighlight()
  }

  restartGame = action(() => {
    localStorage.removeItem('ChessFen')
    this.chess = new Chess()
    this.initVariables()
    this.removeHightLightCells()
    this.resetCapturedFigures()
    this.setGameStatus('playing')
    gameStatus(this)
    try {
      localStorage.removeItem('LocalGameStatus')
    } catch (e) {
      console.log('Не удалось удалить fen из localStorage: ', e)
    }
  })

  setBoard = action((board) => {
    this.board = { ...this.board, ...board }
  })

  setStatusMessage = action((statusMessage) => {
    this.statusMessage = statusMessage
  })


  setGameStatus = action((status) => {
    this.gameStatus = status
    this.saveStatusLocalStorage(status)
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









  saveStatusLocalStorage(gameStatus) {
    try {
      localStorage.setItem('LocalGameStatus', JSON.stringify(gameStatus))
    } catch (e) {
      console.log('Не удалось сохранить статус в localStorage: ', e)
    }
  }


  loadStatusFromLocalStorage = action(() => {

    const gameStatus = localStorage.getItem('LocalGameStatus')

    console.log('Статус из локал стораж ', gameStatus)

    if (gameStatus === 'finished') {
      this.setGameStatus('finished')
      this.setStatusMessage('Игра завершена!')
    }

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

    // const promotion = 'rnbqkbnr/pp1P1ppp/8/8/8/8/PPp1PPPP/RNBQKBNR w KQkq - 0 1'
    // const pat = '7k/5Q2/6K1/8/8/8/8/8 b - - 19 10'

    // if (promotion) this.loadGame(promotion)
    // if (fen) this.loadGame(pat)
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