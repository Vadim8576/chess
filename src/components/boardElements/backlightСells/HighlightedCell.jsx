import styled from "styled-components";
import { observer } from "mobx-react-lite";
import AppStore from "../../../store/AppStore";


const CellWrapper = styled.div`
position: absolute;
top: ${props => props.$top + 1}px;
left: ${props => props.$left + 1}px;
pointer-events: none;
z-index: 99;
width: ${props => props.$cellSize - 2}px;
height: ${props => props.$cellSize - 2}px;
display: flex;
justify-content: center;
align-items: center;
`

const Cell = styled.div`
border: 3px solid ${props => props.color};
width: 100%;
height: 100%;
pointer-events: none;
`


const HighlightedCell = observer(({ highlightedCell }) => {

	// console.log(highlightedCell)
	
	if (!highlightedCell?.visible) return null

	const colTemp = highlightedCell.cell.col
	const rowTemp = highlightedCell.cell.row
	const col = AppStore.whiteBottom ? colTemp : (7 - colTemp)
	const row = AppStore.whiteBottom ? rowTemp : (7 - rowTemp)
	const top = row * AppStore.board.cellSize
	const left = col * AppStore.board.cellSize


	return (
		<CellWrapper
			$top={top}
			$left={left}
			$cellSize={AppStore.board.cellSize}
		>
			<Cell
				color={highlightedCell.color}
				// $type={type}
			/>
		</CellWrapper>
	)
})

export default HighlightedCell