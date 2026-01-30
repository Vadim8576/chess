// src/components/AuthManager.tsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../../api/firebase';
import Portal from '../UI/Portal';
import authStore from '../../store/authStore';

const AuthManager = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь вошел в систему (анонимно или иным способом)
        setCurrentUser(user)
        authStore.setUser(user)
        console.log("Пользователь вошел в систему:", user.uid)
      } else {
        // Пользователь вышел из системы
        setCurrentUser(null)
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
      // setIsOpen(true)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Загрузка аутентификации...</div>
  }

  return (
    <Portal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {currentUser ? (
        <p>Вы вошли как анонимный пользователь с UID: {currentUser.uid}</p>
      ) : (
        <p>Вы не вошли в систему.</p>
      )}
    </Portal>
  )
}

export default AuthManager
