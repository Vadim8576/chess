import { useState } from 'react';
import styled from 'styled-components';
import BoardElements from '../boardElements/BoardElements';
import { observer } from 'mobx-react-lite';
import BoardCanvas from './BoardCanvas';



const BoardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;




const ChessBoard = observer(({ containerRect, cellSize }) => {

  const [boardRect, setBoardRect] = useState({})

  console.log('ChessBoard Render')


  return (
    <>
      <BoardCanvas
        cellSize={cellSize}
        setBoardRect={setBoardRect}
        containerRect={containerRect}
      />
      <BoardElements
        cellSize={cellSize}
        startX={boardRect.x}
        startY={boardRect.y}
      />
    </>
  )
})

export default ChessBoard