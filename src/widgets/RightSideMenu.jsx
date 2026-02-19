import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import gameStore from '../store/gameStore';
import Widget from './Widget';
import SquareButton from '../components/UI/SquareButton';
import HandshakeIcon from '../components/UI/icons/HandshakeIcon';
import FlagIcon from '../components/UI/icons/FlagIcon';
import AppStore from '../store/AppStore';
import RestartIcon from '../components/UI/icons/RestartIcon';
import HomeIcon from '../components/UI/icons/HomeIcon';
import { useNavigate } from 'react-router';


const Menu = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
flex-direction: column;
width: 100%;
height: 100%;
overflow: hidden;
// border: 1px #999 solid;
`



const RightSideMenu = observer(({ setDialogType }) => {


 

  const restartGame = () => {
    console.log('Restart')
    AppStore.restartGame()
  }

  return (
    <>
      {
        AppStore.gameType === 'local'
          ? (
            <Widget
              gridColumn={'9 / 13'}
              gridRow={'9 / 11'}
            >
              <Menu>
                <SquareButton
                  icon={<HomeIcon />}
                  // text={'Домой'}
                  onClick={() => {
                    setDialogType('home')
                    gameStore.setShowDrawDialog(true)
                  }}
                />
                < SquareButton
                  icon={<RestartIcon />}
                  // text={'Новая игра'}
                  onClick={() => {
                    setDialogType('restart')
                    gameStore.setShowDrawDialog(true)
                  }}
                />
              </Menu>
            </Widget >
          )
          : (
            <Widget
              gridColumn={'9 / 13'}
              gridRow={'8 / 11'}
            >
              <Menu>
                <SquareButton
                  icon={<HomeIcon />}
                  // text={'Домой'}
                  onClick={() => {
                    setDialogType('home')
                    gameStore.setShowDrawDialog(true)
                  }}
                />
                <SquareButton
                  icon={<HandshakeIcon />}
                  // text={'Ничья?'}
                  onClick={() => {
                    setDialogType('drawOffer')
                    gameStore.setShowDrawDialog(true)
                  }}
                  inert={gameStore.isShowDrawButton}
                />
                <SquareButton
                  icon={<FlagIcon />}
                  // text={'Сдаться'}
                  onClick={() => {
                    setDialogType('resignation')
                    gameStore.setShowDrawDialog(true)
                  }}
                />
              </Menu>
            </Widget>
          )}
    </>
  )
})

export default RightSideMenu