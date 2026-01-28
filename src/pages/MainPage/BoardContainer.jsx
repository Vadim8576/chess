import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";

const Container = styled.div`
	// border: 1px blue solid;
	aspect-ratio: 1 / 1;
	grid-column: 1 / 9; 
  grid-row: 3 / 11;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
`;



const BoardContainer = observer(({windowSize}) => {

	console.log('BoardContainer')

	const ref = useRef(null)


	useEffect(() => {
		if (!ref.current) return

		const boardContainerRect = ref.current.getBoundingClientRect()

		appStore.setBoard({
			x: boardContainerRect.x,
			y: boardContainerRect.y
		})

	}, [windowSize.width, windowSize.height, appStore.board.cellSize])

	return (
		<Container
			ref={ref}
			$size={appStore.board.cellSize * 8}
		>
			<ChessBoard />
		</Container>
	)
})

export default BoardContainer