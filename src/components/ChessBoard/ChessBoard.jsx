import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import BoardElements from '../boardElements/BoardElements';
import appStore from '../../store/appStore';
import Board from './Board';
import { useFigureDrag } from '../../hooks/useFigureDrag';
import { useCallback, useEffect, useState } from 'react';
import DraggableFigure from '../boardElements/DraggableFigure';
import HighlightedCell from '../boardElements/backlightСells/HighlightedCell';
import BacklightСells from '../boardElements/backlightСells/BacklightСells';
import { gameStatus } from '../../utils/gameStatus';




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

  const size = appStore.board.cellSize * 8

  const [draggedFigure, setDraggedFigure] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  // const getGameStatus = useGameStatus(appStore)

  const {
    isDragging,
    position,
    grabCell,
    highlightedCell,
    lastMoveCells,
    possibleMoves,
    cellInCheck,
    fugureMove,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  } = useFigureDrag(
    appStore,
    setDraggedFigure,
    setIsMoving,
  )


  useEffect(() => {
    const chessFen = localStorage.getItem('ChessFen')
    if (chessFen) {
      appStore.loadFromLocalStorage()
    }
  }, []);


  useEffect(() => {
    gameStatus(appStore)
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


  const fugureMoveMemo = useCallback((startCell, finishCell) => {
    fugureMove(startCell, finishCell)
  }, [handlePointerDown])


  return (
    <BoardWrapper $size={size}>
      <Board />

      <BacklightСells
        fugureMove={fugureMoveMemo}
        grabCell={grabCell}
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
        isMoving={isMoving}
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