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
import { COLORS } from '../../constants/gameInitial';


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
// border-radius: 5px;
color: ${COLORS.background};
background-color: ${COLORS.secondary};
&:hover {
  background-color: ${COLORS.errorCell};
}
`

const InviteLinkContainer = styled.div`
width: 100%;
font-size: 2vmin;
color: green;
font-weight: bold;
`


const Home = observer(() => {
  // const [inviteLink, setInviteUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [creatorColor, setCreatorColor] = useState('w')

  const navigate = useNavigate()

  const { isAuth, startAuth } = useAuth()


  useEffect(() => {
    AppStore.setCurrentPage('home')
  }, [])

  useEffect(() => {
    if (!isAuth) return
    gameStore.createFastOnlineGame(creatorColor)
  }, [isAuth])



  useEffect(() => {
    if (!gameStore.inviteLink) return
    setIsLoading(false)
  }, [gameStore.inviteLink])




  const localGame = () => {

    navigate('/local')
  }

  const inviteGame = async () => {
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

    if (isLoading && !gameStore.inviteLink) return <Spinner scale={1} />
    if (!isLoading && gameStore.inviteLink) return 'В игру'
    return <>Быстрая игра по сети</>
  })


  return (
    <HomeWrapper>
      <MenuWrapper>
        <MenuButton onClick={localGame}>
          Локальная игра
        </MenuButton>
        <MenuButton
          onClick={
            (!isLoading && gameStore.inviteLink)
              ? () => inviteGame()
              : () => createFastGame()
          }
        >
          {/* {(isLoading !== null && !inviteLink) && isLoading ? <Spinner scale={1} /> : 'Быстрая игра по сети'} */}
          <CreateButtonInside isLoading={isLoading} />
        </MenuButton>
        {/* {inviteLink && <InviteLink inviteLink={inviteLink} />} */}

        <MenuButton onClick={RateGame}>
          Рейтинговая игра по сети
        </MenuButton>
      </MenuWrapper>
    </HomeWrapper >
  )
})

export default Home