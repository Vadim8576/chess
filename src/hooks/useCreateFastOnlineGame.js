import { useEffect, useMemo, useState } from "react"
import { useAuth } from "./useAuth"
import gameStore from "../store/gameStore"

export const useCreateFastOnlineGame = () => {
  const [isGameCreate, setIsGameCreate] = useState(false)
  const { creatorUid, isAuth, start } = useAuth()

  useEffect(() => {
    if (!isAuth) return
    gameStore.createFastOnlineGame()
  }, [isAuth])

  

  useEffect(() => {
    if(!gameStore.currentGameId) return
    setIsGameCreate(true)
  }, [gameStore.currentGameId])


  const values = {
    creatorUid, isGameCreate, start
  }

  return useMemo(() => values, [values])
}