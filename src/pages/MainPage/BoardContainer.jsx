import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";
import Widget from "../../widgets/Widget";
import GameStatus from "../../widgets/GameStatus";
import { FOOTER_HEIGHT, GAME_COLORS, HEADER_HEIGHT } from "../../constants/gameInitial";

const Container = styled.div`
	
	aspect-ratio: 1 / 1;

	grid-column: 1 / 9; 
  grid-row: 3 / 11;
`;






const BoardContainer = observer(({ windowSize }) => {
	// const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const ref = useRef(null)


	useEffect(() => {
		if (!ref.current) return

		const boardContainerRect = ref.current.getBoundingClientRect()

		console.log(boardContainerRect.x, boardContainerRect.y)

		// 50 - высота Header
		 // 12 - размер Grid
		let cellSize = (windowSize.height > 500 ? (windowSize.height - HEADER_HEIGHT - FOOTER_HEIGHT) : 500) / 12

		// if(windowSize.height < windowSize.width) {
		// 	cellSize = windowSize.height / 12
		// } else {
		// 	cellSize = windowSize.width / 12
		// }




		appStore.setBoard({
			cellSize,
			borderSize: cellSize / 2.5,
			x: boardContainerRect.x,
			y: boardContainerRect.y
		})

	}, [windowSize.width, windowSize.height])

	return (
		<Container ref={ref}>
			<ChessBoard />
		</Container>
	)
})

export default BoardContainer