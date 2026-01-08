import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { boardMap, files, ranks } from "../constants/boardInitial";



class appStore {

  board = [...boardMap]


  constructor() {
    makeAutoObservable(this);

  }


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

}

export default new appStore()