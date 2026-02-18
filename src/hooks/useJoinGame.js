import { useMemo, useState } from "react"
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import gameStore from "../store/gameStore"
import authStore from "../store/authStore"

export const useJoinGame = (gameId) => {
  const [isJoin, setIsJoin] = useState(false)
  const [gameExists, setGameExists] = useState(true)
  // const [isCreator, setIsCreator] = useState(false)

  const joinGame = async () => {
    try {
      const userCredential = await signInAnonymously(auth)
      const user = userCredential.user.uid;
      console.log('Id присоединившегося юзера = ', user)
      // console.log('Id игры = ', gameId)


      let gameInfo = await gameStore.getGameInfoById(gameId)
      console.log(gameInfo)

      if (!gameInfo) { // нет документа с gameId
        setGameExists(false)
        return
      } else {
        setGameExists(true)
      }


      if (gameInfo.creatorUid === user) {
        console.log('Это создатель игры!')
        authStore.setCreatorUid(gameInfo.creatorUid)
        setIsJoin(true)
        return
      }

      if (gameInfo.joinerUid === user) {
        console.log('Уже подключился к игре, в БД есть его id!')
        authStore.setJoinerUid(gameInfo.joinerUid)
        setIsJoin(true)
        return
      }



      // Каким цветом играет присоединившийся
      let key = gameInfo.whitePlayerUid == null ? 'whitePlayerUid' : 'blackPlayerUid'

      // Обновляем документ игры, записывая UID текущего пользователя
      const gameRef = doc(db, "games", gameId)
      await updateDoc(gameRef, {
        joinerUid: user,
        [key]: user,
        status: 'playing',
        updatedAt: serverTimestamp()
      }).then(() => {


        authStore.setJoinerUid(user)
        gameStore.setCurrentGameId(gameId)
        setIsJoin(true)

        console.log(`Пользователь ${user} успешно присоединился к игре ${gameId}`);
      })


    } catch (error) {
      console.error("Ошибка при присоединении к игре:", error);
    }
  }

  const values = {
    isJoin, joinGame, gameExists
  }

  return useMemo(() => values, [values])
}

