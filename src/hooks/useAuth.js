import { onAuthStateChanged, signInAnonymously } from "firebase/auth"
import { useEffect, useMemo, useState } from "react"
import { auth } from "../api/firebase"
import authStore from "../store/authStore"

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isAuthLoading, setAuthLoading] = useState(false)



  useEffect(() => {
    if (!isAuthLoading) return
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь вошел в систему (анонимно или иным способом)
        authStore.setUserId(user.uid)
        setIsAuth(true)
        console.log("Пользователь вошел в систему:", user.uid)
      } else {
        // Пользователь вышел из системы
        setUserId(null)
        authStore.setUserId(null)
        console.log("Пользователь вышел из системы.")
        // Попытка анонимного входа, если пользователь не вошел
        signInAnonymously(auth)
          .then(() => {
            console.log("Успешный анонимный вход.")
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.error("Ошибка при анонимном входе:", errorCode, errorMessage)
          })
      }

    })

    return () => unsubscribe()
  }, [isAuthLoading])


  const startAuth = () => {
    setAuthLoading(true)
  }

  const values = {
    isAuth, startAuth
  }


  return useMemo(() => values, [values])
}