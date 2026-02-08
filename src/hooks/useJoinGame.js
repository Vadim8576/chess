import { useMemo, useState } from "react"
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import gameStore from "../store/gameStore"
import authStore from "../store/authStore"

export const useJoinGame = (gameId) => {
  const [isJoin, setIsJoin] = useState(false)
  // const [isCreator, setIsCreator] = useState(false)

  const joinGame = async () => {
    try {
      const userCredential = await signInAnonymously(auth)
      const joinerUid = userCredential.user.uid;
      console.log('Id присоединившегося юзера = ', joinerUid)
      console.log('Id игры = ', gameId)


      let creatorUid = await gameStore.getCreatorId(gameId)


      
      if (creatorUid === joinerUid) {
        console.log('Это создатель игры!')
        authStore.setCreatorUid(creatorUid)
        setIsJoin(true)
        return
      }


      // Обновляем документ игры, записывая UID текущего пользователя
      const gameRef = doc(db, "games", gameId)
      await updateDoc(gameRef, {
        joinerUid: joinerUid,
        blackPlayerUid: joinerUid,
        status: 'playing',
        updatedAt: serverTimestamp()
      }).then(() => {

        
        authStore.setJoinerUid(joinerUid)
        gameStore.setCurrentGameId(gameId)
        setIsJoin(true)

        console.log(`Пользователь ${joinerUid} успешно присоединился к игре ${gameId}`);
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

