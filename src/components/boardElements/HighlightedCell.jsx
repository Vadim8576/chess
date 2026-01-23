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
// background-color: ${props => props.color};
border: 3px solid ${props => props.color};
width: 100%;
height: 100%;
// transform: rotate(${props => props.$type === 'possibleMoves' ? '45' : ''}deg);

// opacity: .5;
`;


const HighlightedCell = observer(({ highlightedCell }) => {
	
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