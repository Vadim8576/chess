import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import AppStore from '../../store/AppStore';
import Board from './Board';
import FiguresContainer from '../boardElements/FiguresContainer';
import DraggableFigure from '../boardElements/DraggableFigure';
import HighlightedCell from '../boardElements/backlightСells/HighlightedCell';
import BacklightСells from '../boardElements/backlightСells/BacklightСells';
import { useFigureDrag } from '../../hooks/useFigureDrag';
import { useGamepad } from '../../hooks/useGamepad';
import GameController from './GameController';
import { COLORS } from '../../constants/gameInitial';
import { getSquare } from '../../utils/getSquare';
import { useGamePadCursor } from '../../hooks/useGamePadCursor';


const BoardWrapper = styled.div`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
`;

// const FullSizeWrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;


const ChessBoard = observer(() => {
  // console.log('ChessBoard Render')

  const size = AppStore.board.cellSize * 8
  const [draggedFigure, setDraggedFigure] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  const [pressCounter, setPressCounter] = useState(0)
  const { gamepadState, isConnected, isButtonPressed } = useGamepad()

  const {
    isDragging,
    position,
    grabCell,
    highlightedCell,
    fugureMove,
    firstPress,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  } = useFigureDrag(
    AppStore,
    setDraggedFigure,
    setIsMoving,
  )

  const handlePointerDownMemo = useCallback((e, square) => {
    handlePointerDown(e, square)
  }, [handlePointerDown])

  const fugureMoveMemo = useCallback((startCell, finishCell, type) => {
    fugureMove(startCell, finishCell, type)
  }, [fugureMove])


  const { gamePadCursor } = useGamePadCursor(
    isButtonPressed,
    isConnected,
    grabCell,
    fugureMoveMemo,
    firstPress
  )


  useEffect(() => {

  }, [gamePadCursor])




  // console.log(gamePadCursor)




  useEffect(() => {
    AppStore.updateKingCheckHighlight()

    if (AppStore.gameType !== 'local') return

    handlePointerCancel()
    AppStore.loadGameFromLocalStorage()
    AppStore.loadStatusFromLocalStorage()
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












  return (
    <BoardWrapper $size={size}>
      <GameController isShow={false} />
      <Board />

      <BacklightСells
        fugureMove={fugureMoveMemo}
        grabCell={grabCell}
      />

      {highlightedCell.visible && !isConnected && (
        <HighlightedCell
          highlightedCell={highlightedCell}
        />
      )}

        {/* Клетка шаха */}
      {AppStore.cellInCheck.visible && (
        <HighlightedCell
          highlightedCell={AppStore.cellInCheck}
        />
      )}

      {/* Курсор геймпада */}
      <HighlightedCell
        highlightedCell={gamePadCursor}
        type={'gamePadCursor'}
      />


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