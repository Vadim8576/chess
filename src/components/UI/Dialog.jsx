import styled from 'styled-components';
import AppStore from '../../store/AppStore';
import { observer } from 'mobx-react-lite';
import { COLORS } from '../../constants/gameInitial';
import CloseIcon from './icons/CloseIcon';
import Button from './Button';



const DialogContainer = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: none;
z-index: 200;
`



const DialogShadow = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
width: ${props => props.$width}px;
height: ${props => props.$height}px;
background-color: rgba(0, 0, 0, .4);
`

const Wrapper = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
width: ${props => props.$width}px;
height: ${props => props.$height}px;
display: flex;
justify-content: center;
flex-direction: column;
border: 1px ${COLORS.neutral} solid;
// box-shadow: 0 0 0 1px rgba(17,20,24,.1),0 1px 1px rgba(17,20,24,.2);
// border-radius: 4px;
background-color: rgba(255, 255, 255, 1);
box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
padding: 10px;
`

const Header = styled.div`
flex: 1; 
display: flex;
justify-content: flex-end;
align-items: flex-start;
min-width: 0;
`

const IconWripper = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
height: 100%;
aspect-ratio: 1 / 1;
&:hover {
  background-color: ${COLORS.neutral};
  color: #fff;
}
`

const Row = styled.div`
flex: 3; 
min-width: 0;
display: flex;
justify-content: center;
align-items: center;
// padding-right: 10px;
`

const Message = styled.div`
font-size: 1.6vmin;
padding: 0 0 10px 0;
font-weight: normal;
margin-left: 10px;
`

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 50%;
`

// const Button = styled.button`
// display: flex;
// justify-content: center;
// align-items: center;
// width: 48%;
// padding: .6rem .1rem;
// // padding: 10px 20px;
// border: 1px ${COLORS.neutral} solid;
// background-color: #fff;
// color: ${COLORS.primary};
// // text-transform: uppercase;
// cursor: pointer;
// font-weight: normal;
// font-size: 1.3vmin;
// overflow: hidden;
// &:hover {
//   background-color: ${COLORS.neutral};
//   color: #fff;
// }
// `


const Dialog = observer(({ dialog = null }) => {

  // console.log(dialog)

  if (!dialog) return null

  const cellSize = AppStore?.board?.cellSize

  const okButtonHandler = (e) => {
    e.stopPropagation()
    dialog.onOk()
  }

  const cancelButtonHandler = (e) => {
    e.stopPropagation()
    dialog.onCancel()
  }

  return (
    <DialogContainer
    // onClick={cancelButtonHandler}
    >
      <DialogShadow

        $top={cellSize * 2}
        $left={0}
        $width={cellSize * 8}
        $height={cellSize * 8}
      >
        <Wrapper
          $top={cellSize * 2.5}
          $left={cellSize * 1}
          $width={cellSize * 6}
          $height={cellSize * 3}
        >
          <Header>
            <IconWripper onClick={cancelButtonHandler}>
              <CloseIcon />
            </IconWripper>
          </Header>
          <Row>
            <Message>{dialog.text}</Message>
          </Row>
          <Row>
            <ButtonWrapper>
              <Button onClick={okButtonHandler}>Да</Button>
              <Button onClick={cancelButtonHandler}>Отмена</Button>
            </ButtonWrapper>
          </Row>
        </Wrapper >
      </DialogShadow>
    </DialogContainer>
  )
})


export default Dialog

