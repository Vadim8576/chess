import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import gameStore from '../../store/gameStore';
import { observer } from 'mobx-react-lite';
import { useCreateFastOnlineGame } from '../../hooks/useCreateFastOnlineGame';


const HomeWrapper = styled.div`
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`

const MenuWrapper = styled.div`
display: flex;
flex-direction: column;
width: 50%;
max-width: 400px;
// max-height: 70%;
// min-height: 300px;
justify-content: flex-start;
// border: 1px #666 solid;
`

const MenuButton = styled.button`
width: 100%;
height: min-content;
border: none;
margin: 0;
padding: 20px;
font-size: 2.2vmin;
cursor: pointer;
margin-bottom: 10px;
border-radius: 5px;
`

const InvitLinkContainer = styled.div`
width: 100%;
`


const Home = observer(() => {
  const [inviteUrl, setInviteUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const navigate = useNavigate()

  const { creatorUid, isGameCreate, start } = useCreateFastOnlineGame()



  useEffect(() => {
    console.log('isGameCreate = ', isGameCreate)
    if(!isGameCreate) return
    setIsLoading(false)
    setInviteUrl(`${window.location.origin}/lobby/${gameStore.currentGameId}`)
  }, [isGameCreate])




  const localGame = () => navigate('/local')

  const inviteGame = () => navigate(`/game/${gameStore.currentGameId}`)

  const fastGame = () => {
    setIsLoading(true)
    start()

  }

  const RateGame = () => navigate('/rate')



  return (
    <HomeWrapper>
      <MenuWrapper>
        <MenuButton onClick={localGame}>
          Локальная игра
        </MenuButton>
        <MenuButton
          onClick={fastGame}
        >
          {isLoading !== null && isLoading ? 'Spinner' : 'Быстрая игра по сети'}
        </MenuButton>
        {inviteUrl &&

          <InvitLinkContainer>
            <p>Ссылка-приглашение:</p>
            <p>{inviteUrl}</p>
            <button
              onClick={inviteGame}
              style={{ padding: '10px 20px' }}
            >В игру</button>
          </InvitLinkContainer>

        }
        <MenuButton onClick={RateGame}>
          Рейтинговая игра по сети
        </MenuButton>
      </MenuWrapper>
    </HomeWrapper >
  )
})

export default Home