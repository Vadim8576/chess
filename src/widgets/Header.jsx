import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { COLORS } from "../constants/gameInitial";



// const HeaderLine = styled.div`
// display: flex;
// justify-content: flex-start;
// align-items: center;
// width: 100%;
// height: ${props => props.$height}px;
// border: 1px #666 solid;
// `;

const HEADER_HEIGHT = 30

const HeaderLine = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: ${HEADER_HEIGHT}px;
// font-size: clamp(8px, 2.5vw, 14px);
font-size: 2.2vmin;

color: ${COLORS.neutral};
// color: ${props => props.color};
background-color: ${props => props.$background};
// border-radius: 10px 10px 0 0;
`;

const Header = observer(({ title }) => {


  return (
    <HeaderLine
      color={title.color}
      $background={title.background}
    >
      {title.title}
    </HeaderLine>
  )
})

export default Header