import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";



class appStore {
  chess = new Chess()

  // Сверять hash по сети
  // hash = chess.hash()
  // -> '3436f01fd716346e'

  board = {
    cellSize: 0,
    borderSize: 0
  }
  historyMoves = []
  historyList = []
  whiteBottom = true // true | false
  status = ''
  capturedFigures = {
    'w': [],
    'b': []
  }

  constructor() {
    makeAutoObservable(this)
  }



  saveToLocalStorage() {
    const fen = this.chess.fen()
    try {
      localStorage.setItem('ChessFen', fen)
    } catch (e) {
      console.log('Не удалось сохранить fen в localStorage: ', e)
    }
  }

  loadFromLocalStorage() {
    const fen = localStorage.getItem('ChessFen')
    if (fen) this.chess.load(fen)
  }


  restartGame() {
    console.log('Restart в Store')
    try {
      localStorage.removeItem('ChessFen')
      this.chess = new Chess()
    } catch (e) {
      console.log('Не удалось удалить fen из localStorage: ', e)
    }
  }


  // get whiteBottom() {
  //   return this.whiteBottom
  // }

  setBoard(board) {
    this.board = { ...this.board, ...board }
    // console.log('board = ', toJS(this.board))
  }



  setGameStatus(status) {
    this.status = status
  }

  //Взятые фигуры
  addCapturedFigures(color, figure) {
    // this.capturedFigures[color] = [...this.capturedFigures[color], figure]
    this.capturedFigures = {
      ...this.capturedFigures,
      [color]: [...this.capturedFigures[color], figure]
    }
    console.log(toJS(this.capturedFigures))
  }




  updateHistoryMoves(newHistoryMove) {
    this.historyMoves = [...this.historyMoves, newHistoryMove]
    console.log(toJS(this.historyMoves))
  }



  // updateHistoryList(newHistoryMoive) {
  //   this.historyList = [...this.historyList, newHistoryMoive]
  // }

  updateHistoryList() {
    const historyList = this.chess.history({ verbose: true })
    // console.log(historyList)
    if (historyList.length === 0) return
    const history = historyList[historyList.length - 1]

    const historyMove = {
      move: `${history.from}-${history.to}`,
      color: history.color,
      id: historyList.length
    }

    this.historyList = [...this.historyList, historyMove]
  }





  // setChecked = () => {
  //   this.checked = !this.checked
  //   this.whiteBottom = this.checked
  // }

}

export default new appStore()