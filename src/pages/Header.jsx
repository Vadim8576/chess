import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { COLORS, HEADER_HEIGHT } from "../constants/gameInitial";
import AppStore from "../store/AppStore";
import { gameStatus } from "../utils/gameStatus";
import AuthManager from "../components/authManager/AuthManager";
import gameStore from "../store/gameStore";
import { useNavigate } from "react-router";


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
  font-size: 2.2vmin;
`






const Header = observer(() => {

  const navigate = useNavigate()


  const restartGame = () => {
    console.log('Restart')
    AppStore.restartGame()
    AppStore.removeHightLightCells()
    gameStatus(AppStore)
  }
  
  const rotateBoard = () => {
    console.log('rotateBoard')
    AppStore.rotateBoard()
  }
  
  
  const createNewAnonymous = () => {
    navigate('/anonymousgame')
    // gameStore.createNewAnonymous()
  }


  return (
    <HeaderLine $height={HEADER_HEIGHT}>
      <h1 style={{ color: '#fff' }}>Chess</h1>
      <div>
        <RestartButton
          color={'green'}
          onMouseDown={createNewAnonymous}
        >
          Create Game
        </RestartButton>
        <RestartButton
          color={'green'}
          onMouseDown={restartGame}
        >
          New game
        </RestartButton>
        <RestartButton
          color={'blue'}
          onMouseDown={rotateBoard}
        >
          Rotate
        </RestartButton>
      </div>

    </HeaderLine>
  )
})

export default Header