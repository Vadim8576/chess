import styled from "styled-components";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import useWindowResizeThrottle from "../../hooks/useWindowResizeThrottle";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
  height: calc(100% - 30px * 2 - 50px * 2);
`;



const BoardContainer = () => {
	const [containerRect, setContainerRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const [cellSize, setCellSize] = useState(0)
	const { width, height } = useWindowResizeThrottle(100)
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

	}, [width, height])

	return (
		<Container ref={ref}>
			<ChessBoard
				containerRect={containerRect}
				cellSize={cellSize}
			/>
		</Container>
	);
};

export default BoardContainer