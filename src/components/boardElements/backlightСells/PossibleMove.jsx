import styled from "styled-components";
import { observer } from "mobx-react-lite";
import AppStore from "../../../store/AppStore";
import { COLORS } from "../../../constants/gameInitial";
import { useEffect, useRef } from "react";


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
  
  const ref = useRef(null)
  const colTemp = cell.col
  const rowTemp = cell.row
  const col = AppStore.whiteBottom ? colTemp : (7 - colTemp)
  const row = AppStore.whiteBottom ? rowTemp : (7 - rowTemp)
  const top = row * AppStore.board.cellSize
  const left = col * AppStore.board.cellSize

  // console.log(grabCell)

  const onPointerDown = (col, row) => {
    // setSecondClick(true)
    const startCell = { ...grabCell }
    const finishCell = { col, row }
    console.log(startCell, finishCell)
    fugureMove(startCell, finishCell, 'doubleClick')

  }




  // const handleDocumentClick = (event) => {

    // setSecondClick(true)
    // console.log('secondClick ', secondClick)


    // console.log('клетка ', ref.current)
    // console.log('Нажал на ', event.target)


    // if (ref.current && ref.current.contains(event.target)) {
    //   console.log('!!!!!!!!!!!!!!!!!!! TRUE');
    //   return
    // }


    // console.log('!!!!!!!!!!!!!!!!!!! FALSE')


  // }


  // useEffect(() => {
  //   document.addEventListener('pointerdown', handleDocumentClick)
  //   return () => {
  //     document.removeEventListener('pointerdown', handleDocumentClick)
  //   }
  // }, [])





  return (
    <CellWrapper

      $top={top}
      $left={left}
      $cellSize={AppStore.board.cellSize}
    >
      <Cell ref={ref} onPointerUp={() => onPointerDown(colTemp, rowTemp)} />
    </CellWrapper>
  )
})

export default PossibleMove