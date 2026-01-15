import { useEffect, useState } from "react";
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";


const CellWrapper = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;

z-index: 99;
width: ${props => props.$cellSize - 1}px;
height: ${props => props.$cellSize - 1}px;
display: flex;
justify-content: center;
align-items: center;
`



const Cell = styled.div`
background-color: ${props => props.color};
border: 2px solid green;
width: ${props => props.$type === 'possibleMoves' ? '40' : '100'}%;
height: ${props => props.$type === 'possibleMoves' ? '40' : '100'}%;
transform: rotate(${props => props.$type === 'possibleMoves' ? '45' : ''}deg);

// opacity: .5;
`;


const HighlightedCell = observer(({ highlightedCell, type }) => {

	// const color = highlightedCell.color ? highlightedCell.color : '#999'
	const colTemp = highlightedCell.col
	const rowTemp = highlightedCell.row
	const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
	const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)

	if (!highlightedCell.visible) return

	return (
		<CellWrapper
			$top={row * appStore.board.cellSize + 1}
			$left={col * appStore.board.cellSize + 1}
			$cellSize={appStore.board.cellSize}
		>
			<Cell
				color={highlightedCell.color}
				$type={type}
			/>
		</CellWrapper>
	)
})

export default HighlightedCell