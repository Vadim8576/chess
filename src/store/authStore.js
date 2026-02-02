import { action, makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
// import { logOut } from '../api/firebase'



class Auth {

  user = null
  // newUserCreated = 'no' // 'yes', 'no' или 'error'
  isLogIn = false

  constructor() {
    makeAutoObservable(this)
  }

  setUser = action((user) => {
    this.user = user
    // console.log('Пользователь вошел. ID = ', this.user.uid)
  })

  // setNewUserCreated = (created) => {
  //   this.newUserCreated = created
  // }

  // setError = action((error) => {
  //   this.authError = error
  // })

  // singIn = action(async (email, password) => {
  //   await fb.singIn(email, password)
  // })

  // logout() {
  //   logOut()
  // }

  // setLogIn = action((bool) => {
  //   this.isLogIn = bool
  // })

  // createUser = ({email, password, nickName}) => {
  //   fb.createUser({email, password, nickName, setNewUserCreated: this.setNewUserCreated})
  // }

}

export default new Auth()