import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";



class appStore {

  // checked = true
  chess = new Chess()
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
    makeAutoObservable(this);
  }

  // get whiteBottom() {
  //   return this.whiteBottom
  // }

  setBoard(board) {
    this.board = { ...this.board, ...board }
    console.log('board = ', toJS(this.board))
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
    console.log(historyList)
    if(historyList.length === 0) return
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