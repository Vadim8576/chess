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
    this.board = {...this.board, ...board}
    // console.log('board = ', toJS(this.board))
  }

  updateHistoryList(newHistoryList) {
    this.historyList = [...newHistoryList]
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







  // setChecked = () => {
  //   this.checked = !this.checked
  //   this.whiteBottom = this.checked
  // }

}

export default new appStore()