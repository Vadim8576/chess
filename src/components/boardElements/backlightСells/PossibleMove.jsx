import styled from "styled-components";
import { observer } from "mobx-react-lite";
import appStore from "../../../store/appStore";
import { COLORS } from "../../../constants/gameInitial";


const CellWrapper = styled.div`
position: absolute;
top: ${props => props.$top + 1}px;
left: ${props => props.$left + 1}px;
z-index: 99;
width: ${props => props.$cellSize - 2}px;
height: ${props => props.$cellSize - 2}px;
display: flex;
justify-content: center;
align-items: center;
`



const Cell = styled.div`
border: 3px solid ${COLORS.possibleCell};
width: 100%;
height: 100%;
cursor: pointer;
`;

const PossibleMove = observer(({ cell, fugureMove, grabCell }) => {

  const colTemp = cell.col
  const rowTemp = cell.row
  const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
  const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)
  const top = row * appStore.board.cellSize
  const left = col * appStore.board.cellSize
  // const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
  // const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)
  // const top = row * appStore.board.cellSize
  // const left = col * appStore.board.cellSize

  const onPointerDown = (col, row) => {

    const startCell = {...grabCell}
    const finishCell = {col, row}
    console.log(startCell, finishCell)

    fugureMove(startCell, finishCell, 'doubleClick')
  }

  return (
    <CellWrapper
      $top={top}
      $left={left}
      $cellSize={appStore.board.cellSize}
    >
      <Cell onPointerDown={() => onPointerDown(colTemp, rowTemp)} />
    </CellWrapper>
  )
})

export default PossibleMove