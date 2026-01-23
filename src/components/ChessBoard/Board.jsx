import styled from "styled-components";
import appStore from "../../store/appStore";
import { useEffect, useState } from "react";
import { files, ranks } from "../../constants/gameInitial";


// const Container = styled.div`
// position: relative;
// width: ${props => props.$size}px;
// height: ${props => props.$size}px;
// `
const Container = styled.div.attrs(props => ({
	style: {
		width: `${props.$size}px`,
		height: `${props.$size}px`,
	},
}))`
	position: relative;
`

// const Cell = styled.div`
// position: absolute;
// top: ${props => props.$top}px;
// left: ${props => props.$left}px;
// width: ${props => props.$cellSize}px;
// height: ${props => props.$cellSize}px;
// background: ${props => props.color};
// `



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


const Board = () => {
	const [board, setBoard] = useState([])


	useEffect(() => {
		// Доска
		setBoard([])
		ranks.forEach((rank, y) => {
			return files.forEach((file, x) => {
				const isBlack = (y + x) % 2 === 0;
				const cell = {
					id: `${file}${rank}`,
					color: isBlack ? '#f0d9b5' : '#b58863',
					top: appStore.board.cellSize * y,
					left: appStore.board.cellSize * x
				}
				setBoard(prev => [...prev, cell])
			})
		})

	}, [appStore.whiteBottom, appStore.board.cellSize])



	// useEffect(() => {
	// 	console.log(board)
	// }, [board])

	return (
		<Container
			$size={appStore.board.cellSize * 8}
		>
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
	);
};

export default Board