import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx';
import { Chess } from "chess.js";



class appStore {

  checked = true
  chess = new Chess()
  whiteBottom = true
  
  constructor() {
    makeAutoObservable(this);

  }

  get whiteBottom() {
    return this.whiteBottom
  }

  setChess = (chess) => {

  }

  setChecked = () => {
    this.checked = !this.checked
    this.whiteBottom = this.checked
  }

}

export default new appStore()