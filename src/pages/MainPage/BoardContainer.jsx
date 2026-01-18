import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";
import Widget from "../../widgets/Widget";
import GameStatus from "../../widgets/GameStatus";
import { gameColors } from "../../constants/gameInitial";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	// width: 100%;
	height: 100%;
	// aspect-ratio: 1 / 1;
	flex: 0 0 60%;
	max-width: 60%;
	
`;






const BoardContainer = observer(({ windowSize }) => {
	// const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const ref = useRef(null)


	useEffect(() => {
		if (!ref.current) return

		const boardContainerRect = ref.current.getBoundingClientRect()

		let cellSize
		if ((boardContainerRect.height) < boardContainerRect.width) {
			cellSize = (boardContainerRect.height) / 8
		} else {
			cellSize = boardContainerRect.width / 8
		}

		// cellSize = 798 / 8

		appStore.setBoard({ cellSize, borderSize: cellSize / 2.5 })


	}, [windowSize.width, windowSize.height])

	return (
		<Container ref={ref}>
			<ChessBoard />
		</Container>
	)
})

export default BoardContainer