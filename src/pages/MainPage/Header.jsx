import { observer } from "mobx-react-lite";
import styled from "styled-components";
import CapturedFigure from "../../components/boardElements/CapturedFigure";
import { figure } from "../../constants/boardInitial";


const HeaderLine = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: ${props => props.$height}px;
border: 1px #666 solid;
`;


const Header = observer(({headerHeight}) => {


  return (
    <HeaderLine $height={headerHeight}>
      <h1>Header</h1>
    </HeaderLine>
  )
})

export default Header