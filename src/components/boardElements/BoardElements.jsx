import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components"
import { files, ranks } from "../../constants/gameInitial";
import Figure from "./Figure"
import HighlightedCell from "./HighlightedCell"
import { getSrc } from "../../utils/getSrc";
import appStore from "../../store/appStore";
import useGameStatus from "../../hooks/useGameStatus";
import { useFigureDrag } from "../../hooks/useFigureDrag";
import PossibleMove from "./PossibleMove";
import DraggableFigure from "./DraggableFigure";
import LastMove from "./LastMove";


const ElementsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

`;


const Indicator = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
border: 3px solid yellow;
z-index: 200;
width: 30px;
height: 30px;
pointer-events: none;
`;

const BoardElements = observer(() => {

  console.log('BoardElements')

  const [highlightedCell, setHighlightedCell] = useState({
    col: 0,
    row: 0,
    color: 'green',
    visible: false
  })

  const [possibleMoves, setPossibleMoves] = useState([])
  const [lastMoves, setLastMoves] = useState([])
  const [figures, setFigures] = useState([])
  const [position, setPosition] = useState([])
  const [draggedFigure, setDraggedFigure] = useState({ src: null, id: null })

  const getGameStatus = useGameStatus(appStore)

  const {
    isDragging,
    setActiveFigure,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  } = useFigureDrag(
    appStore,
    getGameStatus,
    setDraggedFigure,
    setHighlightedCell,
    setPossibleMoves,
    setPosition,
    setLastMoves
  )

  useEffect(() => {
    console.log('Перерисовка фигур')
    setFigures([])
    const board = appStore.chess.board()
    ranks.forEach((rank, y) => {
      return files.forEach((file, x) => {
        const src = getSrc(appStore.whiteBottom, board, x, y)
        if (!src) return
        const state = {
          src,
          id: `${file}${rank}`,
          top: appStore.board.cellSize * y,
          left: appStore.board.cellSize * x
        }

        setFigures(prev => [...prev, state])
      })
    })
  }, [appStore.board.cellSize, appStore.whiteBottom, appStore.status])




  // useEffect(() => {
  //   console.log('activeFigure = ', activeFigure)
  // }, [activeFigure])


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


  return (
    <ElementsWrapper>
      {possibleMoves.map(possibleMove => (
        <PossibleMove
          key={possibleMove.id}
          cell={possibleMove.cell}
        />
      ))}

      {lastMoves && lastMoves.map(lastMove => (
        <LastMove
          key={lastMove.id}
          cell={lastMove.cell}
        />
      ))}

      {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
        />
      )}

      {figures.map(figure => {
        if (draggedFigure.id !== figure.id) {
          return (
            <Figure
              key={figure.id}
              src={figure.src}
              top={figure.top}
              left={figure.left}
              id={figure.id}
              handlePointerDown={handlePointerDown}
              setDraggedFigure={setDraggedFigure}
            />
          )
        }
      })}

      {draggedFigure && (
        <DraggableFigure
          image={draggedFigure.image}
          position={position}
        />
      )}


      {/* <Indicator
        top={appStore.board.y}
        left={appStore.board.x}
      /> */}


    </ElementsWrapper>
  )
})

export default BoardElements
