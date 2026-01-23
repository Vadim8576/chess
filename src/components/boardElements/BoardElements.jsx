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
  const [lastMoves, setLastMoves] = useState([])
  const [figures, setFigures] = useState([])
  const [position, setPosition] = useState([])
  const [imgStyle, setImgStyle] = useState({ zIndex: 100, transition: 'none' })
  const [activeFigure, setActiveFigure] = useState({square: null, id: null})



  const getGameStatus = useGameStatus(appStore)


  const {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useFigureDrag(
    appStore,
    setHighlightedCell,
    setPossibleMoves,
    getGameStatus,
    setPosition,
    setImgStyle,
    activeFigure,
    setFigures,
    setLastMoves
  )

  // const board = appStore.chess.board()

  useEffect(() => {

    console.log('BoardElements useEffect!!!!!!!!!!!!!!!!!!!!')
    console.log(position && position.x, position && position.y)

    setFigures([])
    // setPosition([])
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

        // setPosition({})
        
      })
    })
  }, [appStore.board.cellSize, appStore.whiteBottom, appStore.status])
  // }, [appStore.board.cellSize, appStore.whiteBottom, appStore.status])




  useEffect(() => {
    console.log('activeFigure = ', activeFigure)
  }, [activeFigure])




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
      {possibleMoves.moves && possibleMoves.moves.map(possibleMove => (
        <PossibleMove
          key={possibleMove.id}
          possibleMove={{
            ...possibleMove,
            visible: possibleMoves.visible
          }}
        />
      ))}
      {/* {possibleMoves.moves && possibleMoves.moves.map(cell => (
        <HighlightedCell
          key={cell.id}
          highlightedCell={{
            ...cell,
            color: possibleMoves.color,
            visible: possibleMoves.visible
          }}
          type={'possibleMoves'}
        />
      ))} */}

      {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
        />
      )}

      {figures.map(figure => {
        if (activeFigure === figure.id) {

          // console.log('figure!!!!!!!!!!!!!!!!!!!!!!!')
          // console.log(activeFigure, figure.id, 'activeFigure === figure.id ', activeFigure === figure.id)
          // console.log(position && position.x, position && position.y)
        }
        return (
          <Figure
            key={figure.id}
            src={figure.src}
            top={figure.top}
            left={figure.left}
            // top={(activeFigure === figure.id && position) ? position.y : figure.top}
            // left={(activeFigure === figure.id && position) ? position.x : figure.left}
            id={figure.id}
            setActiveFigure={setActiveFigure}
            activeFigure={activeFigure}
            imgStyle={imgStyle}
          />)
      })}
      {/* {figures.map(figure => (
        <Figure
          key={figure.id}
          src={figure.src}
          top={(activeFigure === figure.id && position) ? position.y : figure.top}
          left={(activeFigure === figure.id && position) ? position.x : figure.left}
          id={figure.id}
          setActiveFigure={setActiveFigure}
          activeFigure={activeFigure}
          imgStyle={imgStyle}
        />
      ))} */}
    </ElementsWrapper>
  )
})

export default BoardElements