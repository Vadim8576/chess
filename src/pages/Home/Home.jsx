import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';


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


const Home = () => {
  const navigate = useNavigate()

  const localGame = () => navigate('/local')
  const fastGame = () => navigate('/anonymous')
  const RateGame = () => navigate('/rate')

  return (
    <HomeWrapper>
      <MenuWrapper>
        <MenuButton onClick={localGame}>
          Локальная игра
        </MenuButton>
        <MenuButton onClick={fastGame}>
          Быстрая игра по сети
        </MenuButton>
        <MenuButton onClick={RateGame}>
          Рейтинговая игра по сети
        </MenuButton>
      </MenuWrapper>
    </HomeWrapper>
  )
}

export default Home