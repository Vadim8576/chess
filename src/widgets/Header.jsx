import { observer } from "mobx-react-lite";
import styled from "styled-components";



// const HeaderLine = styled.div`
// display: flex;
// justify-content: flex-start;
// align-items: center;
// width: 100%;
// height: ${props => props.$height}px;
// border: 1px #666 solid;
// `;

const headerHeight = 30

const HeaderLine = styled.div`
width: 100%;
height: ${headerHeight}px;
color: ${props => props.$color};
background-color: ${props => props.$background};
`;

const Header = observer(({ title }) => {


  return (
    <HeaderLine
      $color={title.color}
      $background={title.background}
    >
      <h5>{title.title}</h5>
    </HeaderLine>
  )
})

export default Header