import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import authStore from '../store/authStore';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import gameStore from '../store/gameStore';
import { useJoinGame } from '../hooks/useJoinGame';


// async function joinGame(gameId, setIsJoin) {
//   try {
//     const userCredential = await signInAnonymously(auth)
//     const user = userCredential.user;
//     const userUid = user.uid;

//     console.log('Id присоединившегося юзера = ', userUid)

//     // Обновляем документ игры, записывая UID текущего пользователя
//     const gameRef = doc(db, "games", gameId)
//     await updateDoc(gameRef, {
//       joinerUid: userUid,
//       blackPlayerUid: userUid,
//       status: 'playing',
//       updatedAt: serverTimestamp()
//     }).then(() => {

//       authStore.setUserId(userUid)
//       gameStore.setCurrentGameId(gameId)
//       setIsJoin(true)
//       console.log(`Пользователь ${userUid} успешно присоединился к игре ${gameId}`);
//     })


//   } catch (error) {
//     console.error("Ошибка при присоединении к игре:", error);
//   }
// }



const LobbyWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;width: 100%;
height: 100%;

`


const GameLobby = () => {
  const { gameId } = useParams() // Из URL: /game/:gameId

  const { isJoin, joinGame } = useJoinGame(gameId)

  const navigate = useNavigate()


  useEffect(() => {
    console.log(gameId, isJoin)
    if (!gameId || isJoin) return
    joinGame()
  }, [])

  const inviteGame = () => navigate(`/game/${gameId}`)

  return (
    <div>
      {!isJoin ? <div>...LOADING</div> : <button onClick={inviteGame}>В игру</button>}
    </div>
  )

}


export default GameLobby



