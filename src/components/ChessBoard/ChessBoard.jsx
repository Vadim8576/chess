import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardBorderCanvas from './BoardBorderCanvas';
import BoardCanvas from './BoardCanvas';
import useWindowResizeThrottle from '../../hooks/useWindowResizeThrottle';
import BoardElements from '../boardElements/BoardElements';
import appStore from '../../store/appStore';
import { observer } from 'mobx-react-lite';



const BoardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
`;



const ChessBoard = observer(() => {
  const boardRef = useRef(null)
  const [boardRect, setBoardRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
  const [cellSize, setCellSize] = useState(0)
  const { width, height } = useWindowResizeThrottle(500)

  console.log('ChessBoard Render')

  useEffect(() => {
    const boardRect = boardRef.current.getBoundingClientRect()
    console.log(boardRect)

    setBoardRect({
      y: boardRect.y,
      x: boardRect.x,
      w: boardRect.width,
      h: boardRect.height
    })

    setCellSize(boardRect.width / 8)


/*
    while (!appStore.chess.isGameOver()) {
      const moves = appStore.chess.moves()
      const move = moves[Math.floor(Math.random() * moves.length)]
      appStore.chess.move(move)
    }
    console.log(chess.pgn())
*/
    // chess.move('e2e4')
    console.table(appStore.chess.board())

  }, [width, height])



  return (
    <>
      <div>
        <div style={{
          float: 'left',
          height: '55px',
          fontSize: '14px'
        }}>
          Играть белыми
        </div>
        <input type="checkbox" checked={appStore.checked} onChange={appStore.setChecked} />
      </div>
      <BoardWrapper ref={boardRef}>
        <BoardBorderCanvas width={boardRect.w} borderSize={60} />
        <BoardCanvas cellSize={cellSize} />
        <BoardElements
          cellSize={cellSize}
          startX={boardRect.x}
          startY={boardRect.y}
        />
      </BoardWrapper>
    </>

  )
})

export default ChessBoard