import { useEffect, useState } from "react";
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";


const CellWrapper = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;

z-index: 99;
width: ${props => props.$cellSize}px;
height: ${props => props.$cellSize}px;
display: flex;
justify-content: center;
align-items: center;
`



const Cell = styled.div`
// background-color: lightgreen;
border: 3px solid lightgreen;
width: 100%;
height: 100%;
// transform: rotate(45deg);

// opacity: .5;
`;


const PossibleMove = observer(({ possibleMove }) => {

  // console.log(possibleMove)
  
  if (!possibleMove.visible) return null

  const colTemp = possibleMove.cell.col
  const rowTemp = possibleMove.cell.row
  const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
  const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)
  const top = row * appStore.board.cellSize
  const left = col * appStore.board.cellSize



  return (
    <CellWrapper
      $top={top}
      $left={left}
      $cellSize={appStore.board.cellSize}
    >
      <Cell />
    </CellWrapper>
  )
})

export default PossibleMove