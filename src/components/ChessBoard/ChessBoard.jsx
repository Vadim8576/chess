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
import gameStore from '../../store/gameStore';
import Spinner from '../UI/Spinner';


const BoardWrapper = styled.div`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
`;

const FullSizeWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ChessBoard = observer(() => {
  // console.log('ChessBoard Render')

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

    // gameStatus(AppStore)
    handlePointerCancel()
    updateKingCheckHighlight()

    if (AppStore.gameType !== 'local') {
       // Убрать ненужные подсветки клетки
      return
    }

    AppStore.loadGameFromLocalStorage()
    AppStore.loadCapturedFiguresFromLocalStorage()
    AppStore.setSettingFromLocalStorage()

  }, [AppStore.gameType])







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




  const ShowSpinner = observer(() => {
    if (AppStore.gameType === 'local') return null

    console.log('isLoading = ', gameStore.isLoading)

    if (gameStore.isLoading) {
      return (
        <FullSizeWrapper>
          <Spinner />
        </FullSizeWrapper>
      )
    } else {
      return null
    }
  })


  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', AppStore.gameType)


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
      {(AppStore.gameType !== 'local' && gameStore.isLoading) && (
        <FullSizeWrapper>
          <Spinner />
        </FullSizeWrapper>)
      }
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