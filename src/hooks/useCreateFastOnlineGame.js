import { useEffect, useMemo, useState } from "react"
import { useAuth } from "./useAuth"
import gameStore from "../store/gameStore"

export const useCreateFastOnlineGame = (isAuth) => {
  const [isGameCreate, setIsGameCreate] = useState(false)

  // const { isAuth, start } = useAuth()

  useEffect(() => {
    if (!isAuth) return
    gameStore.createFastOnlineGame()
  }, [isAuth])

  

  useEffect(() => {
    if(!gameStore.currentGameId) return
    setIsGameCreate(true)
  }, [gameStore.fastOnlineGameId])


  const values = {
    isGameCreate
  }

  return useMemo(() => values, [values])
}