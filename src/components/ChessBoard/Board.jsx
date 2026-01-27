import styled from "styled-components";
import appStore from "../../store/appStore";
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
    left: 2px;
    font-size: 1.5vmin;
`
const CellFile = styled.div`
  position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 1.5vmin;
`


const Board = memo(observer(() => {

	console.log('Board')

	const cellSize = appStore.board.cellSize

	const board = useMemo(() => {
		const cells = [];
		ranks.forEach((rank, y) => {
			files.forEach((file, x) => {
				const isBlack = (y + x) % 2 === 0
				cells.push({
					id: `${file}${rank}`,
					color: isBlack ? COLORS.whiteCell : COLORS.blackCell,
					// color: isBlack ? '#f0d9b5' : '#b58863',
					top: appStore.board.cellSize * y,
					left: appStore.board.cellSize * x,
					file: y == 7 ? file : null,
					rank: x == 0 ? rank : null
				})
			})
		})

		return cells;
	}, [cellSize, appStore.whiteBottom])



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
