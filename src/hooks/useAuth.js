import { onAuthStateChanged, signInAnonymously } from "firebase/auth"
import { useEffect, useMemo, useState } from "react"
import { auth } from "../api/firebase"
import authStore from "../store/authStore"

export const useAuth = () => {
  const [creatorUid, setCreatorUid] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [startAuth, setStartAuth] = useState(false)



  useEffect(() => {
    if (!startAuth) return
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь вошел в систему (анонимно или иным способом)
        setCreatorUid(user.uid)
        authStore.setCreatorUid(user.uid)
        setIsAuth(true)
        console.log("Пользователь вошел в систему:", user.uid)
      } else {
        // Пользователь вышел из системы
        setCreatorUid(null)
        authStore.setCreatorUid(null)
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
  }, [startAuth])


  const start = () => {
    setStartAuth(true)
  }

  const values = {
    creatorUid, isAuth, start
  }


  return useMemo(() => values, [values])
}