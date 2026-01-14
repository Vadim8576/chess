import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";



class appStore {

  // checked = true
  chess = new Chess()
  board = {
    cellSize: 0,
    borderSize: 0,
  }
  history = []
  whiteBottom = true // true | false
  blackStatus = ''
  whiteStatus = ''
  capturedFigures = {
    'w': [],
    'b': []
  }

  constructor() {
    makeAutoObservable(this);
  }

  get whiteBottom() {
    return this.whiteBottom
  }

  setBoard(board) {
    this.board = {...board}
    // console.log('board = ', toJS(this.board))
  }

  updateHistory(move) {
    this.history = [...this.history, move]
  }

  setGameStatus(player, status) {
    if (player === 'w') {
      this.whiteStatus = status
    } else {
      this.blackStatus = status
    }
  }

  //Взятые фигуры
  addCapturedFigures(color, figure) {
    this.capturedFigures[color] = [...this.capturedFigures[color], figure]
  }







  // setChecked = () => {
  //   this.checked = !this.checked
  //   this.whiteBottom = this.checked
  // }

}

export default new appStore()