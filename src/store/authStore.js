import { action, makeAutoObservable } from "mobx";
import { fb } from "../api/firebase"
// import { logOut } from '../api/firebase'



class Auth {

  userId = null

  // newUserCreated = 'no' // 'yes', 'no' или 'error'
  // isLogIn = false

  constructor() {
    makeAutoObservable(this)
  }




  setUserId = action((id) => {
    this.userId = id
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