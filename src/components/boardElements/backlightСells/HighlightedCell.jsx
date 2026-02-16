import styled, { keyframes } from "styled-components";
import { observer } from "mobx-react-lite";
import AppStore from "../../../store/AppStore";
import { COLORS } from "../../../constants/gameInitial";


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



// const pulseGlow = keyframes`
//   0% {
//     box-shadow: 0 0 10px 3px rgba(255, 215, 0, 0.5);
//     opacity: 0.8;
//   }
//   50% {
//     box-shadow: 0 0 20px 8px rgba(255, 215, 0, 0.9);
//     opacity: 1;
//   }
//   100% {
//     box-shadow: 0 0 10px 3px rgba(255, 215, 0, 0.5);
//     opacity: 0.8;
//   }
// `;


const pulseGlow = keyframes`
  0% {
    // box-shadow: 0 0 10px 3px ${COLORS.secondary}; /* rgba(..., 0.31) */
    opacity: 0.5;
  }
  50% {
    // box-shadow: 0 0 20px 8px ${COLORS.secondary}; /* rgba(..., 0.6) */
    opacity: 1;
  }
  100% {
    // box-shadow: 0 0 10px 3px ${COLORS.secondary};
    opacity: 0.5;
  }
`;




const GamePadCursor = styled.div`
  background-color: ${props => props.color};
	// border: 3px solid ${props => props.color};
  width: 100%;
  height: 100%;
  opacity: 0.6;
  pointer-events: none;
  animation: ${pulseGlow} 2s infinite;
`;


const HighlightedCell = observer(({ highlightedCell, type = 'default' }) => {

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
			{type === 'default'
				? <Cell	color={highlightedCell.color}	/>
				: <GamePadCursor color={highlightedCell.color}	/>
			}

		</CellWrapper>
	)
})

export default HighlightedCell