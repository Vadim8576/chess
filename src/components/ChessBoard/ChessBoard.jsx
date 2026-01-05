import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Figure from '../Figure/Figure';
import BoardCanvas from './BoardCanvas';
import { ranks, files, figure, board } from './const';
import BoardBorderCanvas from './BoardBorderCanvas';
import HighlightedCell from './HighlightedCell';


const BoardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
`;

const Figures = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const ChessBoard = () => {
  const boardRef = useRef(null)
  const [boardRect, setBoardRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
  const [cellSize, setCellSize] = useState(0)
  const [highlightedCell, setHighlightedCell] = useState({ col: 0, row: 0, visible: false })

  useEffect(() => {
    const boardRect = boardRef.current.getBoundingClientRect();
    console.log(boardRect)

    setBoardRect({
      y: boardRect.y,
      x: boardRect.x,
      w: boardRect.width,
      h: boardRect.height
    })

    setCellSize(boardRect.width / 8)
  }, [])



  return (
    <BoardWrapper ref={boardRef}>
      <BoardBorderCanvas width={boardRect.w} borderSize={60} />
      <BoardCanvas cellSize={cellSize}>
      </BoardCanvas>

      <HighlightedCell
        cellSize={cellSize}
        highlightedCell={highlightedCell}
      />

      <Figures>
        {ranks.map((rank, y) => {
          return files.map((file, x) => {
            return (
              <Figure
                key={file+rank}
                src={figure[board[y][x]]}
                top={cellSize * y}
                left={cellSize * x}
                startX={boardRect.x}
                startY={boardRect.y}
                cellSize={cellSize}
                setHighlightedCell={setHighlightedCell}
              />
            );
          })
        })}
      </Figures>
    </BoardWrapper>
  );
}

export default ChessBoard;