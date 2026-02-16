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
import Spinner from '../components/UI/Spinner';
import GameDoesNotExist from './GameDoesNotExist';
import PageWrapper from './PageWrapper';



const GameLobby = observer(() => {
  const { gameId } = useParams() // Из URL: /game/:gameId

  const { isJoin, joinGame, gameExists } = useJoinGame(gameId)
  

  // const navigate = useNavigate()


  useEffect(() => {
    AppStore.setCurrentPage('lobby')
    // console.log(gameId, isJoin, gameStore.inviteLink)
    // console.log('user id = ', authStore.creatorUid)

    // Если authStore.userId !== null - это создатель игры, либо приглашенный игрок уже подключился, не присоединяемя к игре (joinGame)
    if (!gameId || isJoin || authStore.creatorUid !== null) return
    joinGame()
  }, [authStore.creatorUid])

  // const inviteGame = () => navigate(`/fastgame/${gameId}`)

  let show = null


  if (authStore.creatorUid && gameStore?.gameData?.status === 'waiting') {
    show = 'invitationLink'
    gameStore.setInviteUrl(`${window.location.origin}/fastgame/${gameId}`)

  } else if(!isJoin) {
    show = 'loading'
  }



  // if (!isJoin) {
  //   show = 'loading'
  // } else {
  //   // show = 'inviteGame'
  // }
  // if (!authStore.creatorUid && isJoin) show = 'inviteGame'


  if(!gameExists) return <GameDoesNotExist />

  return (
    <PageWrapper>
      {{
        'invitationLink': <InviteLink />,
        'loading': <Spinner scale={1.5} />,
        // 'loading': <div>...LOADING</div>,
        // 'inviteGame': <button onClick={inviteGame}>В игру</button>
      }[show]}
    </PageWrapper>
  )

})


export default GameLobby



