import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import gameStore from '../../store/gameStore';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../hooks/useAuth';


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

const InviteLinkContainer = styled.div`
width: 100%;
`


const Home = observer(() => {
  const [inviteUrl, setInviteUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [isCopied, setIsCopied] = useState(false)

  const navigate = useNavigate()

  const { isAuth, startAuth } = useAuth()


  useEffect(() => {
    if (!isAuth) return
    gameStore.createFastOnlineGame()
  }, [isAuth])



  useEffect(() => {
    if (!gameStore.currentGameId || gameStore.currentGameId === 'local') {
      setInviteUrl(null)
    } else {
      setInviteUrl(`${window.location.origin}/lobby/${gameStore.currentGameId}`)
    }
  }, [gameStore.currentGameId])




  const localGame = () => navigate('/local')

  const inviteGame = () => {
    setInviteUrl(null)
    navigate(`/game/${gameStore.fastOnlineGameId}`)
  }

  const createFastGame = () => {
    setIsLoading(true)
    startAuth()
  }

  const RateGame = () => navigate('/rate')



  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setIsCopied(true)
      // Сбрасываем статус через 2 сек
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Не удалось скопировать:', err)
    }
  }

  return (
    <HomeWrapper>
      <MenuWrapper>
        <MenuButton onClick={localGame}>
          Локальная игра
        </MenuButton>
        <MenuButton
          onClick={createFastGame}
        >
          {isLoading !== null && isLoading ? 'Spinner' : 'Быстрая игра по сети'}
        </MenuButton>
        {inviteUrl &&

          <InviteLinkContainer>
            <p>Ссылка-приглашение:</p>
            <p>{inviteUrl}</p>
            <button
              onClick={copyToClipboard}
              disabled={isCopied}
              style={{
                padding: '8px 12px',
                backgroundColor: isCopied ? '#4CAF50' : '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isCopied ? 'default' : 'pointer',
                marginBottom: '10px'
              }}
            >
              {isCopied ? 'Скопировано!' : 'Скопировать'}
            </button>
            <button
              onClick={inviteGame}
              style={{ padding: '10px 20px' }}
            >
              В игру
            </button>
          </InviteLinkContainer>

        }
        <MenuButton onClick={RateGame}>
          Рейтинговая игра по сети
        </MenuButton>
      </MenuWrapper>
    </HomeWrapper >
  )
})

export default Home