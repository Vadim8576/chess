import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";



class appStore {

  // checked = true
  chess = new Chess()
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