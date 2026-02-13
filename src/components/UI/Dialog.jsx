import styled from 'styled-components';
import AppStore from '../../store/AppStore';
import { observer } from 'mobx-react-lite';
import { COLORS } from '../../constants/gameInitial';
import closeIcon from "../../assets/icons/close-x.svg"
import Button from './Button';
import { useEffect, useState } from 'react';


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
flex-direction: column;
border: 1px ${COLORS.neutral} solid;
// box-shadow: 0 0 0 1px rgba(17,20,24,.1),0 1px 1px rgba(17,20,24,.2);
// border-radius: 4px;
background-color: rgba(255, 255, 255, 1);
box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
padding: 10px;
`

const IconWripper = styled.div`
flex: 1; 
display: flex;
justify-content: flex-end;
align-items: center;
`

const Icon = styled.img`
width: ${props => props.width}px;
height: ${props => props.height}px;
cursor: pointer;
&:hover {
  background-color: ${COLORS.secondary};
}
`

const Row = styled.div`
flex: 2; 
display: flex;
justify-content: center;
align-items: center;
padding-right: 10px;
`

const Message = styled.div`
font-size: 1.8vmin;
padding: 0 0 10px 0;
font-weight: bold;
margin-left: 10px;
`


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
          <IconWripper>
            <Icon
              width={cellSize / 2}
              height={cellSize / 2}
              src={closeIcon}
              alt='close'
              onClick={cancelButtonHandler}
            />
          </IconWripper>
          <Row>
            <Message>{dialog.text}</Message>
          </Row>
          <Row>
            <Button
              text={'Да'}
              color={COLORS.background}
              backgroundColor={COLORS.secondary}
              onClick={okButtonHandler}
            />
            <Button
              text={'Отмена'}
              color={COLORS.background}
              backgroundColor={COLORS.errorCell}
              onClick={cancelButtonHandler}
            />
          </Row>
        </Wrapper >
      </DialogShadow>
    </DialogContainer>
  )
})


export default Dialog
