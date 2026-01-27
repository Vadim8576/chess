import { useMemo, memo } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components"
import appStore from "../../store/appStore";
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

const BoardElements = memo(observer(({
  setDraggedFigure,
  draggedFigure,
  handlePointerDown,
  isMoving
}) => {

  console.log('BoardElements', appStore.status)


  const figures = useMemo(() => {
    const turn = appStore.chess.turn()
    const figure = []
    const board = appStore.chess.board()
    ranks.forEach((rank, y) => {
      return files.forEach((file, x) => {
        const src = getSrc(appStore.whiteBottom, board, x, y)
        if (!src) return
        const currentFigure = appStore.chess.board()[y][x]
        const state = {
          src,
          id: `${file}${rank}`,
          top: appStore.board.cellSize * y,
          left: appStore.board.cellSize * x,
          pointerEvents: (currentFigure.color !== turn) ? 'none' : 'auto'
        }
        figure.push(state)
      })
    })
    return figure
  }, [appStore.board.cellSize, appStore.whiteBottom, appStore.status])


  return (
    <ElementsWrapper>
      {figures.map(figure => {
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
        top={appStore.board.y}
        left={appStore.board.x}
      /> */}

    </ElementsWrapper>
  )
}))

export default BoardElements
