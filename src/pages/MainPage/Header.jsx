import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { gameColors } from "../../constants/gameInitial";


const HeaderLine = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: ${props => props.$height}px;
padding: 10px;
// border: 1px #666 solid;
background-color: ${gameColors.primary};
// margin-bottom: 20px;
`;




const Header = observer(({headerHeight}) => {


  return (
    <HeaderLine $height={headerHeight}>
      <h1 style={{color: '#fff'}}>Chess</h1>
    </HeaderLine>
  )
})

export default Header