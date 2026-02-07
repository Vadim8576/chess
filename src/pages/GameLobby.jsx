import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import authStore from '../store/authStore';
import styled from 'styled-components';
import gameStore from '../store/gameStore';
import { useJoinGame } from '../hooks/useJoinGame';
import AppStore from '../store/AppStore';
import InviteLink from '../components/UI/InviteLink';
import { observer } from 'mobx-react-lite';
import { COLORS } from '../constants/gameInitial';



const LobbyWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
background-color: ${COLORS.background};
`


const GameLobby = observer(() => {
  const { gameId } = useParams() // Из URL: /game/:gameId

  const { isJoin, joinGame } = useJoinGame(gameId)

  const navigate = useNavigate()


  useEffect(() => {
    AppStore.setCurrentPage('lobby')
    console.log(!gameId, isJoin, gameStore.inviteUrl)

    // Если это создатель игры, не присоединяемя к игре (joinGame)
    if (!gameId || isJoin || gameStore.inviteUrl || authStore.userId) return
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



