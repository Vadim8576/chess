import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";
import Widget from "../../widgets/Widget";
import GameStatus from "../../widgets/GameStatus";
import { gameColors } from "../../constants/gameInitial";

const Container = styled.div`
	// display: flex;
	// justify-content: center;
	// align-items: flex-start;
	// width: 100%;
	// height: 100%;
	// flex: 0 0 60%;
	// max-width: 60%;
	
	aspect-ratio: 1 / 1;

	grid-column: 1 / 8; /* занимает столбцы с 1‑й по 2‑ю линию (2 столбца) */
  grid-row: 2 / 10;    /* занимает строки со 2‑й по 3‑ю линию (2 строки) */
`;






const BoardContainer = observer(({ windowSize }) => {
	// const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const ref = useRef(null)


	useEffect(() => {
		if (!ref.current) return

		const boardContainerRect = ref.current.getBoundingClientRect()

		console.log(boardContainerRect.x, boardContainerRect.y)


		let cellSize = (windowSize.height - 50) / 11

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