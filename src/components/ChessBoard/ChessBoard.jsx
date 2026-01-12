import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardElements from '../boardElements/BoardElements';
import { observer } from 'mobx-react-lite';
import BoardCanvas from './BoardCanvas';
import HighlightedCell from '../boardElements/HighlightedCell';



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




const ChessBoard = observer(({ containerRect, cellSize, windowSize }) => {

  const [boardRect, setBoardRect] = useState({
    w: 0,
    h: 0,
    x: 0,
    y: 0
  })


  console.log('ChessBoard Render')
 
  

  // useEffect(() => {
  //   console.log('boardRect = ', boardRect)
  // }, [boardRect.w, boardRect.h, boardRect.x, boardRect.y])


  return (
    <BoardWrapper
      $width={boardRect.w}
      $height={boardRect.h}
    >
      <BoardCanvas
        cellSize={cellSize}
        setBoardRect={setBoardRect}
        containerRect={containerRect}
        windowSize={windowSize}
      />
      <BoardElements
        cellSize={cellSize}
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