import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import gameStore from '../../store/gameStore';
import { observer } from 'mobx-react-lite';


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



  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!-----------')
    if (!gameStore.fastOnlineGameId) return
    console.log('-----------!!!!!!!!!!!!!!!!!')
    setIsLoading(false)
    setInviteUrl(`${window.location.origin}/chess-game/${gameStore.fastOnlineGameId}`)
  }, [gameStore.fastOnlineGameId])




  const localGame = () => navigate('/local')
  const inviteGame = () => navigate(`/chess-game/${gameStore.fastOnlineGameId}`)
  const fastGame = () => {
    setIsLoading(true)
    gameStore.createFastOnlineGame()
  }
  const RateGame = () => navigate('/rate')



  return (
    <HomeWrapper>
      <MenuWrapper>
        <MenuButton onClick={localGame}>
          Локальная игра
        </MenuButton>
        <MenuButton onClick={fastGame}>
          {isLoading !== null && isLoading ? 'Spinner' : 'Быстрая игра по сети'}
        </MenuButton>
        {inviteUrl &&

          <InvitLinkContainer>
            {`Ссылка-приглашение: ${inviteUrl}`}
            <button onClick={inviteGame}>В игру</button>
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