import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { boardMap, files, ranks } from "../constants/boardInitial";
import { getSrc } from "../utils/getSrc";



class appStore {

  board = [...boardMap]
  currentPlayer = 'white' // black or white
  checked = true

  constructor() {
    makeAutoObservable(this);

  }

  setCurrentPlayer = (color) => {
    this.currentPlayer = color
  }


  boardUpdate = (currentFigure, grabCell, row, col) => {
    this.board = ranks.map((_, y) => {
      return files.map((_, x) => {     
        if (y === row && x === col) return currentFigure
        if (y === grabCell.row && x === grabCell.col) return '  '
        return this.board[y][x]
      })
    })

    console.table(toJS(this.board))

  }

  setChecked = () => {
    this.checked = !this.checked
    this.currentPlayer = this.checked === true ? 'white' : 'black'
  }

}

export default new appStore()