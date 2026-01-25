import { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import appStore from "../../../store/appStore";


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
// background-color: ${props => props.color};
border: 3px solid ${props => props.color};
width: 100%;
height: 100%;
// transform: rotate(${props => props.$type === 'possibleMoves' ? '45' : ''}deg);

// opacity: .5;
`;


const HighlightedCell = observer(({ highlightedCell }) => {

	console.log(highlightedCell)
	
	if (!highlightedCell.visible) return null

	const colTemp = highlightedCell.cell.col
	const rowTemp = highlightedCell.cell.row
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
			<Cell
				color={highlightedCell.color}
				// $type={type}
			/>
		</CellWrapper>
	)
})

export default HighlightedCell