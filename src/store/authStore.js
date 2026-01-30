import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
// import { logOut } from '../api/firebase'



class Auth {

  user = null
  // newUserCreated = 'no' // 'yes', 'no' или 'error'
  isLogIn = false

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user) {
    this.user = user
  }

  // setNewUserCreated = (created) => {
  //   this.newUserCreated = created
  // }

  setError(error) {
    this.authError = error
  }

  async singIn(email, password) {
    await fb.singIn(email, password)
  }

  // logout() {
  //   logOut()
  // }

  setLogIn(bool) {
    this.isLogIn = bool
  }

  // createUser = ({email, password, nickName}) => {
  //   fb.createUser({email, password, nickName, setNewUserCreated: this.setNewUserCreated})
  // }

}

export default new Auth()