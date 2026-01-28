import styled from "styled-components";
import { observer } from "mobx-react-lite";
import appStore from "../../../store/appStore";
import { COLORS } from "../../../constants/gameInitial";
import { useEffect, useRef, useState } from "react";


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
  const [secondClick, setSecondClick] = useState(false)
  const ref = useRef(null)
  const colTemp = cell.col
  const rowTemp = cell.row
  const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
  const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)
  const top = row * appStore.board.cellSize
  const left = col * appStore.board.cellSize

  console.log(grabCell)

  const onPointerDown = (col, row) => {
    setSecondClick(true)
    const startCell = { ...grabCell }
    const finishCell = { col, row }
    console.log(startCell, finishCell)
    setSecondClick(true)
    fugureMove(startCell, finishCell, 'doubleClick')
    // alert('!!')
  }




  const handleDocumentClick = (event) => {

    console.log(event.currentTarget)
    if (ref.current && ref.current.contains(event.target)) {
      console.log('Клик по PossibleMove');
      // alert('!!!')
      return
    }

    // Здесь — логика для клика ВНЕ компонента
    console.log('Клик вне PossibleMove')
    // Ваш код обработки внешнего клика

  }


  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])




  return (
    <CellWrapper
      ref={ref}
      $top={top}
      $left={left}
      $cellSize={appStore.board.cellSize}
    >
      <Cell onPointerUp={() => onPointerDown(colTemp, rowTemp)} />
    </CellWrapper>
  )
})

export default PossibleMove