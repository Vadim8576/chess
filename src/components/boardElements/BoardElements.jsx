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


const ElementsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  const [figures, setFigures] = useState([])


  const getGameStatus = useGameStatus(appStore)


  const {
    isDragging,
    position,
    setPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useFigureDrag(
    appStore,
    setHighlightedCell,
    setPossibleMoves,
    getGameStatus
  )

  // const board = appStore.chess.board()

  useEffect(() => {
    setFigures([])
    const board = appStore.chess.board()
    ranks.map((rank, y) => {
      return files.map((file, x) => {

        const figure = board[y][x]
        const src = getSrc(appStore.whiteBottom, board, x, y)
        if (!src) return
        const state = {
          src,
          id: `${file}${rank}`,
          top: appStore.board.cellSize * y,
          left: appStore.board.cellSize * x
        }

        // console.log(state)
        setFigures(prev => [...prev, state])
      })
    })
  }, [appStore.board.cellSize, appStore.whiteBottom, appStore.status])



  // useEffect(() => {
  //   if (!position) return
  //   // setFigures(state => ([...state, top: position.y, left: position.x]))
  // }, [position])




  // useEffect(() => {
  //   console.log(figures)
  // }, [figures])




  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])


  useEffect(() => {
    getGameStatus()
  }, [appStore.whiteBottom])



  return (
    <ElementsWrapper onMouseDown={handleMouseDown}>
      {possibleMoves.moves && possibleMoves.moves.map(cell => (
        <HighlightedCell
          key={cell.id}
          highlightedCell={{
            ...cell,
            color: possibleMoves.color,
            visible: possibleMoves.visible
          }}
          type={'possibleMoves'}
        />
      ))}

      {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
          type={'highlightedCell'}
        />
      )}

      {figures && figures.map(figure => (
        <Figure
          key={figure.id}
          src={figure.src}
          top={figure.top}
          left={figure.left}
          isDragging={isDragging}
        />
      ))}
    </ElementsWrapper>
  )
})

export default BoardElements