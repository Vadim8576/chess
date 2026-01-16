import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardElements from '../boardElements/BoardElements';
import { observer } from 'mobx-react-lite';
import BoardCanvas from './BoardCanvas';
import appStore from '../../store/appStore';
import BorderCanvas from './BorderCanvas';



const Cell = styled.div`
position: absolute;
background-color: red;
width: 50px;
height: 50px;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
border: none;
`;




const BoardWrapper = styled.div`
  position: relative;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
`;




const ChessBoard = observer(({ containerRect }) => {
  const ref = useRef(null)

  const [boardRect, setBoardRect] = useState({
    w: 0,
    h: 0,
    x: 0,
    y: 0
  })


  console.log('ChessBoard Render')



  useEffect(() => {
    // const boardWrapper = ref.current.getBoundingClientRect()

    // console.log('BoardWrapper = ', boardWrapper)


    // setBoardRect({
    //   x: boardWrapper.x,
    //   y: boardWrapper.y,
    //   w: boardWrapper.width,
    //   h: boardWrapper.height,
    // })
  }, [])


  return (
    <BoardWrapper
      $width={appStore.board.cellSize * 8}
      $height={appStore.board.cellSize * 8}
    >
      <BorderCanvas
      />
      <BoardCanvas
        setBoardRect={setBoardRect}
      />
      <BoardElements
        startX={boardRect.x}
        startY={boardRect.y}
      />


      {/* <Cell
        $top={boardRect.y}
        $left={boardRect.x}
      /> */}
    </BoardWrapper>
  )
})

export default ChessBoard