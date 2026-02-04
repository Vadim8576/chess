import { useMemo, useState } from "react"
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import gameStore from "../store/gameStore"
import authStore from "../store/authStore"

export const useJoinGame = (gameId) => {
  const [isJoin, setIsJoin] = useState(false)

  const joinGame = async () => {
    try {
      const userCredential = await signInAnonymously(auth)
      const user = userCredential.user;
      const userUid = user.uid;

      console.log('Id присоединившегося юзера = ', userUid)

      // Обновляем документ игры, записывая UID текущего пользователя
      const gameRef = doc(db, "games", gameId)
      await updateDoc(gameRef, {
        joinerUid: userUid,
        blackPlayerUid: userUid,
        status: 'playing',
        updatedAt: serverTimestamp()
      }).then(() => {

        authStore.setUserId(userUid)
        gameStore.setCurrentGameId(gameId)
        setIsJoin(true)
        console.log(`Пользователь ${userUid} успешно присоединился к игре ${gameId}`);
      })


    } catch (error) {
      console.error("Ошибка при присоединении к игре:", error);
    }
  }

  const values = {
    isJoin, joinGame
  }

  return useMemo(() => values, [values])
}

