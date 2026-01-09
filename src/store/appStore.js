import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { boardMap, files, ranks } from "../constants/boardInitial";
import { getSrc } from "../utils/getSrc";
import { Chess } from "chess.js";



class appStore {
  // board = [...boardMap]
  currentPlayer = 'white' // Ориентация доски для black or white
  checked = true

  chess = new Chess()

  constructor() {
    makeAutoObservable(this);

  }


  setChess = (chess) => {

  }

  setCurrentPlayer = (color) => {
    this.currentPlayer = color
  }

/*
  boardUpdate = (currentFigure, grabCell, row, col) => {
    this.board = ranks.map((_, y) => {
      return files.map((_, x) => {     
        if (y === row && x === col) return currentFigure
        if (y === grabCell.row && x === grabCell.col) return '  '
        return this.board[y][x]
      })
    })

    // console.table(toJS(this.board))

  }
*/
  setChecked = () => {
    this.checked = !this.checked
    this.currentPlayer = this.checked === true ? 'white' : 'black'
  }

}

export default new appStore()