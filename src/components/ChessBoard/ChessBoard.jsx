import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardBorderCanvas from './BoardBorderCanvas';
import BoardCanvas from './BoardCanvas';
import useWindowResizeThrottle from '../../hooks/useWindowResizeThrottle';
import BoardElements from '../boardElements/BoardElements';
import appStore from '../../store/appStore';
import { observer } from 'mobx-react-lite';



const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
//  width: ${props => props.width}px;



const ChessBoard = observer(({ leftSideRect, cellSize }) => {
  const boardRef = useRef(null)
  const [boardRect, setBoardRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
  // const [cellSize, setCellSize] = useState(0)
  // const { width, height } = useWindowResizeThrottle(500)

  console.log('ChessBoard Render')

  useEffect(() => {
    const boardRect = boardRef.current.getBoundingClientRect()
    console.log(boardRect)
    setBoardRect({
      x: boardRect.x,
      y: boardRect.y,
      w: cellSize * 8 + 60,
      h: cellSize * 8 + 60
    })
  }, [leftSideRect, cellSize])



  return (
    <BoardWrapper ref={boardRef} size={boardRect.w}>
      <BoardBorderCanvas width={boardRect.w} cellSize={cellSize} />
      <BoardElements
        cellSize={cellSize}
        startX={boardRect.x}
        startY={boardRect.y}
      />
    </BoardWrapper>
  )
})

export default ChessBoard