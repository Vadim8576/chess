import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import FiguresContainer from '../boardElements/FiguresContainer';
import AppStore from '../../store/AppStore';
import Board from './Board';
import { useFigureDrag } from '../../hooks/useFigureDrag';
import { useCallback, useEffect, useRef, useState } from 'react';
import DraggableFigure from '../boardElements/DraggableFigure';
import HighlightedCell from '../boardElements/backlightСells/HighlightedCell';
import BacklightСells from '../boardElements/backlightСells/BacklightСells';
import { gameStatus } from '../../utils/gameStatus';


const BoardWrapper = styled.div`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  
`;


const ChessBoard = observer(() => {
  console.log('ChessBoard Render')

  const pageRef = useRef(null)
  const size = AppStore.board.cellSize * 8

  const [draggedFigure, setDraggedFigure] = useState(null)
  const [isMoving, setIsMoving] = useState(false)

  const {
    isDragging,
    position,
    grabCell,
    highlightedCell,
    fugureMove,
    updateKingCheckHighlight,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  } = useFigureDrag(
    AppStore,
    setDraggedFigure,
    setIsMoving,
  )


  useEffect(() => {
    const chessFen = localStorage.getItem('ChessFen')
    if (chessFen) {
      // AppStore.loadGameFromLocalStorage()
    }
    updateKingCheckHighlight()
    gameStatus(AppStore)
    AppStore.setSettingFromLocalStorage()
  }, [AppStore.chess])



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
      />


      {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
        />
      )}

      {AppStore.cellInCheck.visible && (
        <HighlightedCell
          highlightedCell={AppStore.cellInCheck}
        />
      )}

      <FiguresContainer
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