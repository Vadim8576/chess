import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import useWindowResizeThrottle from "../../hooks/useWindowResizeThrottle";
import { observer } from "mobx-react-lite";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
  height: calc(100% - 30px * 2 - 60px * 2);
`;



const BoardContainer = observer(({windowSize}) => {
	const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const [cellSize, setCellSize] = useState(0)
	
	const ref = useRef(null)


	useEffect(() => {
		const containerRect = ref.current.getBoundingClientRect()
		console.log(containerRect)

		setContainerRect({
			y: containerRect.y,
			x: containerRect.x,
			w: containerRect.width,
			h: containerRect.height
		})


		
		let cellSize
		if (containerRect.height > containerRect.width) {
			cellSize = (containerRect.width) / 8
		} else {
			cellSize = (containerRect.height) / 8
		}


		// cellSizeTemp = (containerRect.width - 60) / 8// 10 потому что еще границы доски

		// console.log('width = ', containerRect.width)
		// console.log('cellSizeTemp = ', cellSizeTemp)
		setCellSize(cellSize)

	}, [windowSize.width, windowSize.height])

	return (
		<Container ref={ref}>
			<ChessBoard
				containerRect={containerRect}
				cellSize={cellSize}
			/>
		</Container>
	)
})

export default BoardContainer