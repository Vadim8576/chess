import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import BoardElements from '../boardElements/BoardElements';
import appStore from '../../store/appStore';
import Board from './Board';
import { useFigureDrag } from '../../hooks/useFigureDrag';
import { useGameStatus } from '../../hooks/useGameStatus';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DraggableFigure from '../boardElements/DraggableFigure';
import HighlightedCell from '../boardElements/backlightСells/HighlightedCell';
import BacklightСells from '../boardElements/backlightСells/BacklightСells';




// const Cell = styled.div`
// position: absolute;
// background-color: red;
// width: 50px;
// height: 50px;
// top: ${props => props.$top}px;
// left: ${props => props.$left}px;
// border: none;
// `;

const BoardWrapper = styled.div`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  
`;


const ChessBoard = observer(() => {
  console.log('ChessBoard Render')

  const [draggedFigure, setDraggedFigure] = useState({ src: null, id: null })

  const getGameStatus = useGameStatus(appStore)


  const {
    isDragging,
    position,
    highlightedCell,
    lastMoveCells,
    possibleMoves,
    cellInCheck,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  } = useFigureDrag(
    appStore,
    getGameStatus,
    setDraggedFigure
  )



  useEffect(() => {
    getGameStatus()
    appStore.updateHistoryList()
  }, [appStore.whiteBottom])



  useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
      document.addEventListener('pointercancel', handlePointerCancel)
    }

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerCancel)
    }
  }, [isDragging])


  // const boardElementsProps = useMemo(
  //   () => ({ setDraggedFigure, draggedFigure, highlightedCell, lastMoveCells, possibleMoves }),
  //   [setDraggedFigure, draggedFigure, highlightedCell, lastMoveCells, possibleMoves]
  // )


  const handlePointerDownMemo = useCallback((e, square) => {
    handlePointerDown(e, square)
  }, [handlePointerDown])

  return (
    <BoardWrapper $size={appStore.board.cellSize * 8}>
      <Board />
      
      <BacklightСells
        possibleMoves={possibleMoves}
        lastMoveCells={lastMoveCells}
      />

      {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
        />
      )}

      {cellInCheck.visible && (
        <HighlightedCell
          highlightedCell={cellInCheck}
        />
      )}
     
      <BoardElements
        handlePointerDown={handlePointerDownMemo}
        setDraggedFigure={setDraggedFigure}
        draggedFigure={draggedFigure}
      />

      {draggedFigure && (
        <DraggableFigure
          image={draggedFigure.image}
          position={position}
        />
      )}
    </BoardWrapper>
  )
})

export default ChessBoard