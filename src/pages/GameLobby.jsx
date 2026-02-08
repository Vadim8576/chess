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
    console.log(gameId, isJoin, gameStore.inviteUrl)
    console.log('user id = ', authStore.creatorUid)

    // Если authStore.userId !== null - это создатель игры, либо приглашенный игрок уже подключился, не присоединяемя к игре (joinGame)
    if (!gameId || isJoin || authStore.creatorUid !== null) return
    joinGame()
  }, [authStore.creatorUid])

  const inviteGame = () => navigate(`/fastgame/${gameId}`)

  let show = null
  if (authStore.creatorUid) {
    show = 'invitationLink'
    gameStore.setInviteUrl(`${window.location.origin}/fastgame/${gameId}`)
  }
  if (!authStore.creatorUid && !isJoin) show = 'loading'
  if (!authStore.creatorUid && isJoin) show = 'inviteGame'



  return (
    <LobbyWrapper>
      {{
        'invitationLink': <InviteLink />,
        'loading': <div>...LOADING</div>,
        'inviteGame': <button onClick={inviteGame}>В игру</button>
      }[show]}
    </LobbyWrapper>
  )

})


export default GameLobby



