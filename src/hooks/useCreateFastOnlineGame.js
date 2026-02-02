import { useEffect, useMemo } from "react"
import { useAuth } from "./useAuth"
import authStore from "../store/authStore"
import gameStore from "../store/gameStore"

export const useCreateFastOnlineGame = () => {
  // const [isLoading, setIsLoading] = useState(null)
  const { user, loading, start } = useAuth()

  useEffect(() => {
    if (!user) return
    gameStore.createFastOnlineGame()
  }, [user])

  

  useEffect(() => {
    if(!gameStore.gameData?.boardState) return

    console.log('useEffect Получили gameData.boardState')
    
    gameStore.loadGame(gameStore.gameData.boardState)
  }, [gameStore.gameData])


  const values = {
    user, loading, start
  }

  return useMemo(() => values, [values])
}