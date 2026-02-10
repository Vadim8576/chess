import styled from 'styled-components';
import AppStore from '../../store/AppStore';
import { observer } from 'mobx-react-lite';
import { COLORS } from '../../constants/gameInitial';
import closeIcon from "../../assets/icons/close-x.svg"
import Button from './Button';


const Container = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
width: ${props => props.$width}px;
height: ${props => props.$height}px;
display: flex;
flex-direction: column;
border: 1px ${COLORS.neutral} solid;
// background-color: rgba(255, 255, 255, 1);
background-color: ${COLORS.background};
z-index: 150;
box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
`


const IconWripper = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
width: 100%;
padding: 5px;
`

const Icon = styled.img`
// position: absolute;
// top: 5px;
// right: 5px;
width: 1.5rem;
height: 1.5rem;
cursor: pointer;
&:hover {
  background-color: ${COLORS.errorCell};
}
`

const Row = styled.div`
// position: relative;
// top: ${props => props.$top}px;
// left: ${props => props.$left}px;
// width: ${props => props.$width}px;
// height: ${props => props.$height}px;
width: 100%;
// height: 50%;
display: flex;
justify-content: center;
align-items: center;
// background-color: rgba(255, 255, 255, .8);
// padding: 10px;
// border-top: 1px #999 solid;
padding: 5px;
`
const FigureWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: ${props => props.$width - 10}px;
height: ${props => props.$height - 10}px;
cursor: pointer;
user-select: none;
touch-action: none;
&:hover {
  background-color: ${COLORS.possibleCell};
  // transform: scale(1.05);
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
`;

const Message = styled.div`
font-size: 1.8vmin;
// font-weight: bold;
`


const Dialog = observer(({ content }) => {
  const cellSize = AppStore?.board?.cellSize


  return (
    <Container
      $top={cellSize * 4}
      $left={cellSize * 1}
      $width={cellSize * 6}
      $height={cellSize * 4}
    >
      <IconWripper>
        <Icon
          src={closeIcon}
          alt='close'
          onPointerDown={close}
        />
      </IconWripper>
      <Row>
        <Message>{content}</Message>
      </Row>
      <Row>
        <Button
          text={'Да'}
          color={'white'}
          backgrounColor={'green'}
          onClick={null}
        />
        <Button
          text={'Отмена'}
          color={'white'}
          backgrounColor={'red'}
          onClick={null}
        />
      </Row>
    </Container >
  )
})


export default Dialog
