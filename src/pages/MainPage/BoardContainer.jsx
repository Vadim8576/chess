import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
  // height: calc(100% - 30px * 2 - 60px * 2);
	height: 100%;
`;



const BoardContainer = observer(({ windowSize }) => {
	const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })




	const ref = useRef(null)


	useEffect(() => {
		const containerRect = ref.current.getBoundingClientRect()
		// console.log(containerRect)

		setContainerRect({
			y: containerRect.y,
			x: containerRect.x,
			w: containerRect.width,
			h: containerRect.height
		})

		const headerHeight = 40
		let cellSize

		if ((windowSize.height - headerHeight) < windowSize.width / 2) {
			cellSize = (windowSize.height - headerHeight) / 9
			console.log('if ', 1)
		} else {
			cellSize = windowSize.width / 2 / 10
			console.log('if ', 2)
		}

		appStore.setBoard({ cellSize, borderSize: cellSize / 2.5 })

		console.log('cellSize = ', cellSize)


	}, [windowSize.width, windowSize.height])

	return (
		<Container ref={ref}>
			<ChessBoard
				containerRect={containerRect}

			/>
		</Container>
	)
})

export default BoardContainer