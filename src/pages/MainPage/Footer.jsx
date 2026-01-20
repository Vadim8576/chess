import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { FOOTER_HEIGHT, GAME_COLORS, HEADER_HEIGHT } from "../../constants/gameInitial";


const FooterLine = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: ${props => props.$height}px;
padding: 10px;
// border: 1px #666 solid;
background-color: ${GAME_COLORS.secondary};
// margin-bottom: 20px;
`;




const Footer = observer(() => {


  return (
    <FooterLine $height={FOOTER_HEIGHT}>
      
    </FooterLine>
  )
})

export default Footer