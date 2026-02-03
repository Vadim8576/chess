import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import authStore from '../store/authStore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';








// const invite = async (gameId) => {

//   try {
//     const gameRef = doc(db, 'games', gameId);
//     const gameSnap = await getDoc(gameRef);

//     console.log('gameId = ', gameId)
//     console.log('gameRef = ', gameRef)
//     console.log('gameSnap = ', gameSnap)


//     if (gameSnap.exists()) {
//       const gameData = gameSnap.data();

//       // 3. Проверяем, можно ли присоединиться
//       if (gameData.status === 'waiting' && !gameData.joinerUid) {
//         // 4. Обновляем документ: добавляем joinerUid
//         await updateDoc(gameRef, {
//           joinerUid: auth.currentUser.uid,
//           blackPlayerUid: auth.currentUser.uid,
//           status: 'playing',
//           updatedAt: serverTimestamp()
//         });
//       } else {
//         alert('Игра уже начата или заполнена!');
//       }
//     } else {
//       alert('Игра не найдена!');
//     }
//   } catch (e) {
//     console.error('Ошибка при получения документа: ', e)
//     throw e
//   }

// }



async function joinGame(gameId, setIsJoin) {
  try {
    const userCredential = await signInAnonymously(auth)
    const user = userCredential.user;
    const userUid = user.uid;

    console.log('Id присоединившегося юзера = ', userUid)

    // Обновляем документ игры, записывая UID текущего пользователя
    const gameRef = doc(db, "games", gameId)
    await updateDoc(gameRef, {
      joinerUid: userUid
    }).then(() => {
      console.log(`Пользователь ${userUid} успешно присоединился к игре ${gameId}`);
      setIsJoin(true)
    })


  } catch (error) {
    console.error("Ошибка при присоединении к игре:", error);
  }
}




const GameLobby = () => {
  const [isJoin, setIsJoin] = useState(false)
  const { gameId } = useParams() // Из URL: /game/:gameId


  useEffect(() => {
    console.log(gameId, isJoin)
    if (!gameId && isJoin) return
    console.log('useEffect')
    joinGame(gameId, setIsJoin)
  }, [])


  // useEffect(() => {
  //   if (!gameId) return
  //   // Подписываемся на изменения состояния аутентификации
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // Пользователь вошел в систему (анонимно или иным способом)
  //       // setUser(user)
  //       authStore.setJoinerUid(user)
  //       console.log("Пользователь вошел в систему:", user.uid)
  //       joinGame(gameId)
  //     } else {
  //       // Пользователь вышел из системы
  //       // setUser(null)
  //       authStore.setJoinerUid(null)
  //       console.log("Пользователь вышел из системы.")
  //       // Попытка анонимного входа, если пользователь не вошел
  //       signInAnonymously(auth)
  //         .then(() => {
  //           console.log("Успешный анонимный вход.")

  //         })
  //         .catch((error) => {
  //           const errorCode = error.code
  //           const errorMessage = error.message
  //           console.error("Ошибка при анонимном входе:", errorCode, errorMessage)
  //         })
  //     }
  //     setLoading(false)
  //   })

  //   return () => unsubscribe()
  // }, [gameId])

  const inviteGame = () => navigate(`/game/${gameId}`)

  return (
    <div>
      {!isJoin ? <div>...LOADING</div> : <button onClick={inviteGame}>В игру</button>}
    </div>
  )

}


export default GameLobby



