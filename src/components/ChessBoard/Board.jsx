import styled from "styled-components";
import appStore from "../../store/appStore";
import { useEffect, useState, useMemo, memo } from "react";
import { files, ranks } from "../../constants/gameInitial";

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
`

const Board = memo(() => {
	const board = useMemo(() => {
		const cells = [];

		ranks.forEach((rank, y) => {
			files.forEach((file, x) => {
				const isBlack = (y + x) % 2 === 0
				cells.push({
					id: `${file}${rank}`,
					color: isBlack ? '#f0d9b5' : '#b58863',
					top: appStore.board.cellSize * y,
					left: appStore.board.cellSize * x,
				})
			})
		})

		return cells;
	}, [appStore.board.cellSize, appStore.whiteBottom])

	const containerSize = useMemo(
		() => appStore.board.cellSize * 8,
		[appStore.board.cellSize]
	)

	return (
		<Container $size={containerSize}>
			{board.map(cell => (
				<Cell
					key={cell.id}
					color={cell.color}
					$top={cell.top}
					$left={cell.left}
					$cellSize={appStore.board.cellSize}
				/>
			))}
		</Container>
	)
})

export default Board;
