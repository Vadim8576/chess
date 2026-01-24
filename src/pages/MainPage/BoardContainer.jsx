import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";
import Widget from "../../widgets/Widget";
import GameStatus from "../../widgets/GameStatus";
import { FOOTER_HEIGHT, GAME_COLORS, HEADER_HEIGHT } from "../../constants/gameInitial";

const Container = styled.div`
	// border: 1px blue solid;
	aspect-ratio: 1 / 1;
	grid-column: 1 / 9; 
  grid-row: 3 / 11;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
`;






const BoardContainer = observer(() => {
	// const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const ref = useRef(null)


	useEffect(() => {
		if (!ref.current) return

		const boardContainerRect = ref.current.getBoundingClientRect()

		console.log(boardContainerRect.x, boardContainerRect.y)

		appStore.setBoard({
			x: boardContainerRect.x,
			y: boardContainerRect.y
		})

	}, [appStore.board. cellSize])

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