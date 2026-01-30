import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useMemo, useState } from "react"
import { auth } from "../api/firebase"
import authStore from "../store/authStore"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь вошел в систему (анонимно или иным способом)
        setUser(user)
        authStore.setUser(user)
        console.log("Пользователь вошел в систему:", user.uid)
      } else {
        // Пользователь вышел из системы
        setUser(null)
        authStore.setUser(null)
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
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // if (loading) {
  //   return <div>Загрузка аутентификации...</div>
  // }

  // const values = {
  //   user: authStore.user, isAuth
  
  // }

  const values = {
    user, loading
  }


  return useMemo(() => values, [values])
}