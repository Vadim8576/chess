import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import authStore from '../store/authStore';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import gameStore from '../store/gameStore';
import { useJoinGame } from '../hooks/useJoinGame';
import AppStore from '../store/AppStore';
import InviteLink from '../components/UI/InviteLink';
import { observer } from 'mobx-react-lite';



const LobbyWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`


const GameLobby = observer(() => {
  const { gameId } = useParams() // Из URL: /game/:gameId

  const { isJoin, joinGame } = useJoinGame(gameId)

  const navigate = useNavigate()


  useEffect(() => {
    AppStore.setCurrentPage('lobby')
    console.log(gameId, isJoin, gameStore.inviteUrl)
    if (!gameId || isJoin && gameStore.inviteUrl) return
    joinGame()
  }, [])

  const inviteGame = () => navigate(`/fastgame/${gameId}`)

  return (
    <LobbyWrapper>
      {gameStore.inviteUrl ? <InviteLink /> : !isJoin ? <div>...LOADING</div> : <button onClick={inviteGame}>В игру</button>} 
    </LobbyWrapper>
  )

})


export default GameLobby



