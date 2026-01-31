import styled from "styled-components";
import AppStore from "../../store/AppStore";
import { useMemo, memo } from "react";
import { files, COLORS, ranks } from "../../constants/gameInitial";
import { observer } from "mobx-react-lite";

const Container = styled.div.attrs(props => ({
	style: {
		width: `${props.$size}px`,
		height: `${props.$size}px`,
	},
}))`
	position: relative;
	overflow: hidden;
`

const Cell = styled.div.attrs(props => ({
	style: {
		top: `${props.$top}px`,
		left: `${props.$left}px`,
		width: `${props.$cellSize}px`,
		height: `${props.$cellSize}px`,
		background: props.color
	},
}))`
  position: absolute;
	cursor: no-drop;
`

const CellRank = styled.div`
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 1.5vmin;
	color: ${COLORS.primary};
`
const CellFile = styled.div`
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 1.5vmin;
	color: ${COLORS.primary};
`


const Board = memo(observer(() => {

	// console.log('Board')

	const cellSize = AppStore.board.cellSize

	const board = useMemo(() => {
		const cells = [];
		let currentRanks
		let currentFiles
		if (AppStore.whiteBottom) {
      currentRanks = ranks.slice()
      currentFiles = files.slice()
    } else {
      currentRanks = ranks.slice().reverse()
      currentFiles = files.slice().reverse()
    }

		currentRanks.forEach((rank, y) => {
			currentFiles.forEach((file, x) => {
				const isBlack = (y + x) % 2 === 0
				cells.push({
					id: `${file}_${rank}`,
					color: isBlack ? COLORS.whiteCell : COLORS.blackCell,
					top: cellSize * y,
					left: cellSize * x,
					file: y == 7 ? file : null,
					rank: x == 0 ? rank : null
				})
			})
		})

		return cells
	}, [cellSize, AppStore.whiteBottom])


	return (
		<Container $size={cellSize * 8}>
			{board.map(cell => (
				<Cell
					key={cell.id}
					color={cell.color}
					$top={cell.top}
					$left={cell.left}
					$cellSize={cellSize}
				>
					{cell.rank && <CellRank>{cell.rank}</CellRank>}
					{cell.file && <CellFile>{cell.file}</CellFile>}
				</Cell>
			))}
		</Container>
	)
}))

export default Board;
