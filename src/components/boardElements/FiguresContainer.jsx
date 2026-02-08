import { useMemo, memo } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components"
import AppStore from "../../store/AppStore";
import Figure from "./Figure"
import { getSrc } from "../../utils/getSrc";
import { files, ranks } from "../../constants/gameInitial";


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

const FiguresContainer = memo(observer(({
  setDraggedFigure,
  draggedFigure,
  handlePointerDown,
  isMoving
}) => {



  const figures = useMemo(() => {
    if (!AppStore.chess) return
    const turn = AppStore.chess.turn()
    const board = AppStore.chess.board()
    const figure = []
    ranks.forEach((rank, y) => {
      return files.forEach((file, x) => {
        const src = getSrc(AppStore.whiteBottom, board, x, y)
        const yy = AppStore.whiteBottom ? y : (7 - y)
        const xx = AppStore.whiteBottom ? x : (7 - x)
        const currentFigure = AppStore.chess.board()[yy][xx]
        if (!src || !currentFigure) return
        const state = {
          src,
          id: `${file}_${rank}`,
          top: AppStore.board.cellSize * y,
          left: AppStore.board.cellSize * x,
          pointerEvents: (currentFigure.color !== turn) ? 'none' : 'auto'
        }
        figure.push(state)
      })
    })
    return figure
  }, [
    AppStore.board.cellSize,
    AppStore.whiteBottom,
    AppStore.statusMessage,
    AppStore.chess
  ])


  return (
    <ElementsWrapper>
      {figures && figures.map(figure => {
        if (true) {
          // if (draggedFigure?.id !== figure.id) {
          if (!isMoving || draggedFigure?.id !== figure.id) {
            return (
              <Figure
                key={figure.id}
                src={figure.src}
                top={figure.top}
                left={figure.left}
                id={figure.id}
                handlePointerDown={handlePointerDown}
                setDraggedFigure={setDraggedFigure}
                pointerEvents={figure.pointerEvents}
              />
            )
          }
        }
      })}

      {/* <Indicator
        top={AppStore.board.y}
        left={AppStore.board.x}
      /> */}

    </ElementsWrapper>
  )
}))

export default FiguresContainer
