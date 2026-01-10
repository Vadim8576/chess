import styled from "styled-components";
import ChessBoard from "../components/ChessBoard/ChessBoard";
import { useEffect, useRef, useState } from "react";
import useWindowResizeThrottle from "../hooks/useWindowResizeThrottle";

const LS = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
  flex: 2 1 0%;
  height: 100%;
`;



const LeftSide = () => {
	const [leftSideRect, setLeftSideRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
	const [cellSize, setCellSize] = useState(0)
	const { width, height } = useWindowResizeThrottle(500)
	const ref = useRef(null)


	useEffect(() => {
		const leftSideRect = ref.current.getBoundingClientRect()
		console.log(leftSideRect)

		setLeftSideRect({
			y: leftSideRect.y,
			x: leftSideRect.x,
			w: leftSideRect.width,
			h: leftSideRect.height
		})


		let cellSizeTemp
		const h = leftSideRect.height - 80 // Header + StatusBar

		if (h > leftSideRect.width) {
			cellSizeTemp = (leftSideRect.width) / 10
		} else {
			cellSizeTemp = (h) / 10
		}

		// cellSizeTemp = (leftSideRect.width - 60) / 8// 10 потому что еще границы доски

		console.log('width = ', leftSideRect.width)
		console.log('cellSizeTemp = ', cellSizeTemp)
		setCellSize(cellSizeTemp)

	}, [width, height])

	return (
		<LS ref={ref}>
			<ChessBoard
				leftSideRect={leftSideRect}
				cellSize={cellSize}
			/>
		</LS>
	);
};

export default LeftSide