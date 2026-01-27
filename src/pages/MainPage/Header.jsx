import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { COLORS, HEADER_HEIGHT } from "../../constants/gameInitial";
import appStore from "../../store/appStore";


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
  background-color: #fff;
  color: #000;
  text-transform: uppercase;
  opacity: .7;
  cursor: pointer;
`


const restartGame = () => {
  console.log('Restart')
  appStore.restartGame()
}



const Header = observer(() => {
  return (
    <HeaderLine $height={HEADER_HEIGHT}>
      <h1 style={{color: '#fff'}}>Chess</h1>
      <RestartButton
        onMouseDown={() => restartGame()}
      >
        Начать новую игру
      </RestartButton>
    </HeaderLine>
  )
})

export default Header