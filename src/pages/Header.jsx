import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import styled from "styled-components";
import { COLORS, HEADER_HEIGHT } from "../constants/gameInitial";
import AppStore from "../store/AppStore";
import { gameStatus } from "../utils/gameStatus";
import { NavLink, useNavigate } from "react-router";
import gameStore from "../store/gameStore";


const HeaderLine = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: ${props => props.$height}px;
padding: 10px 30px;
// border: 1px #666 solid;
background-color: ${COLORS.primary};
// margin-bottom: 20px;
`;

const RestartButton = styled.button`
  padding: 8px;
  border: 1px #999 solid;
  border-radius: 5px;
  background-color: ${props => props.color};
  color: #fff;
  text-transform: uppercase;
  opacity: .7;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.5vmin;
`






const Header = observer(() => {

  const navigate = useNavigate()


  const restartGame = () => {
    console.log('Restart')
    AppStore.restartGame()
  }

  const rotateBoard = () => {
    console.log('rotateBoard')
    AppStore.rotateBoard()
  }

  // console.log(toJS(gameStore.currentGameId))

  // const createFastOnlineGame = () => {
  //   navigate('/fast')
  //   // gameStore.createFastOnlineGame()
  // }


  return (
    <HeaderLine $height={HEADER_HEIGHT}>
      <NavLink to='/'
        style={{
          textDecoration: 'none',
          color: '#fff',
        }}
      >
        <h1 style={{ color: '#fff' }}>Chess</h1>
      </NavLink>
      {AppStore.currentPage && <span style={{ color: '#fff', fontSize: '3vmin' }}>{`Page: "${AppStore.currentPage}"`}</span>}


      <div>
        <NavLink to='/gamelist'
          style={{
            color: 'red',
            fontSize: '3vmin'
          }}
        >
          Game List
        </NavLink>

        {
          AppStore.currentPage === 'local' && (
            <RestartButton
              color={'green'}
              onMouseDown={restartGame}
            >
              New game
            </RestartButton>
          )
        }

        {
          (AppStore.currentPage === 'local' || AppStore.currentPage === 'fastgame') && (
            <RestartButton
              color={'blue'}
              onMouseDown={rotateBoard}
            >
              Rotate
            </RestartButton>
          )
        }

      </div>

    </HeaderLine>
  )
})

export default Header