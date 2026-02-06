import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import gameStore from '../../store/gameStore';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../hooks/useAuth';
import AppStore from '../../store/AppStore';
import InviteLink from '../../components/UI/InviteLink';
import Spinner from '../../components/UI/Spinner';


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
display: flex;
justify-content: center;
align-items: center;
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

const InviteLinkContainer = styled.div`
width: 100%;
font-size: 2vmin;
color: green;
font-weight: bold;
`


const Home = observer(() => {
  // const [inviteUrl, setInviteUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const { isAuth, startAuth } = useAuth()


  useEffect(() => {
    AppStore.setCurrentPage('home')
  }, [])

  useEffect(() => {
    if (!isAuth) return
    gameStore.createFastOnlineGame()
  }, [isAuth])



  useEffect(() => {
    setIsLoading(false)
    if (!gameStore.currentGameId || gameStore.currentGameId === 'local') {
      gameStore.setInviteUrl(null)
    } else {
      gameStore.setInviteUrl(`${window.location.origin}/fastgame/${gameStore.currentGameId}`)
    }
  }, [gameStore.currentGameId])




  const localGame = () => navigate('/local')

  const inviteGame = () => {
    // setInviteUrl(null)
    // navigate(`/fastgame/${gameStore.fastOnlineGameId}`)
    navigate(`/fastgame/${gameStore.fastOnlineGameId}`)
  }

  const createFastGame = () => {
    console.log('createFastGame')
    setIsLoading(true)
    gameStore.setInviteUrl(null)
    startAuth()
  }

  const RateGame = () => navigate('/rate')


  const CreateButtonInside = observer(({ isLoading }) => {

    if (isLoading && !gameStore.inviteUrl) return <Spinner scale={1} />
    if (!isLoading && gameStore.inviteUrl) return 'В игру'
    return <>Быстрая игра по сети</>
  })


  return (
    <HomeWrapper>
      <MenuWrapper>
        <MenuButton onClick={localGame}>
          Локальная игра
        </MenuButton>
        <MenuButton
          onClick={(!isLoading && gameStore.inviteUrl) ? () => inviteGame()  : () => createFastGame()}
        >
          {/* {(isLoading !== null && !inviteUrl) && isLoading ? <Spinner scale={1} /> : 'Быстрая игра по сети'} */}
          <CreateButtonInside isLoading={isLoading} />
        </MenuButton>
        {/* {inviteUrl && <InviteLink inviteUrl={inviteUrl} />} */}

        <MenuButton onClick={RateGame}>
          Рейтинговая игра по сети
        </MenuButton>
      </MenuWrapper>
    </HomeWrapper >
  )
})

export default Home