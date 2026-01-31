import styled from "styled-components";
import ChessBoard from "../components/ChessBoard/ChessBoard";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import AppStore from "../store/AppStore";

const Container = styled.div`
	// border: 1px blue solid;
	aspect-ratio: 1 / 1;
	grid-column: 1 / 9; 
  grid-row: 3 / 11;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
`;



const BoardContainer = observer(({ windowSize }) => {

	// console.log('BoardContainer')

	const ref = useRef(null)


	useEffect(() => {
		if (!ref.current) return

		const boardContainerRect = ref.current.getBoundingClientRect()

		AppStore.setBoard({
			x: boardContainerRect.x,
			y: boardContainerRect.y
		})

	}, [windowSize.width, windowSize.height, AppStore.board.cellSize])

	return (
		<Container
			ref={ref}
			$size={AppStore.board.cellSize * 8}
		>
			<ChessBoard />
		</Container>
	)
})

export default BoardContainer