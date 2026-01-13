import { observer } from 'mobx-react-lite';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import appStore from '../../store/appStore';

const BorderCanvas = styled.canvas`
	position: absolute;
  top: -${props => props.$top}px;
  left: -${props => props.$left}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
	border: 2px solid #414833;
	border-radius: 15px;
`;

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
  border: 2px solid #414833;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;


const BoardCanvas = observer(({ cellSize, setBoardRect, containerRect, windowSize }) => {
	const [borderSize, setBorderSize] = useState(cellSize / 2)
	const borderCanvasRef = useRef(null)
	const canvasRef = useRef(null)


	console.log('cellsize = ',  cellSize)

	console.log('BoardCanvas Render')


	useEffect(() => {
		setBorderSize(cellSize / 2.5)
		const borderCanvas = borderCanvasRef.current
		const ctx = borderCanvas.getContext('2d')
		ctx.clearRect(0, 0, borderCanvas.width, borderCanvas.width)

		ctx.fillStyle = '#b58863';
		ctx.fillRect(
			0,
			0,
			borderCanvas.width,
			borderCanvas.width
		)


		// Подписи: буквы (a–h) внизу
		ctx.font = `${cellSize * .18}px Arial`;
		ctx.textAlign = 'center';
		ctx.fillStyle = '#fff';
		for (let col = 0; col < 8; col++) {
			const value = appStore.whiteBottom === true ? (97 + col) : (104 - col)
			const letter = String.fromCharCode(value).toUpperCase(); // a, b, ..., h
			ctx.fillText(
				letter,
				col * cellSize + cellSize,
				borderCanvas.height - borderSize / 2 + 8
			)
		}

		// Подписи: цифры (1–8) справа
		ctx.textAlign = 'center';
		for (let row = 0; row < 8; row++) {
			const value = appStore.whiteBottom === true ? (8 - row) : (row + 1)
			ctx.fillText(
				value,
				borderSize / 2 - 2,
				row * cellSize + cellSize
			)
		}

	})



	useEffect(() => {
	
		const boardRect = canvasRef.current.getBoundingClientRect()
		const coord = containerRect.w > containerRect.h
			? { x: (containerRect.w - boardRect.width) / 2, y: 0 }
			: { x: 0, y: (containerRect.h - boardRect.height) / 2 }

		setBoardRect({
			w: boardRect.width,
			h: boardRect.height,
			x: containerRect.x + coord.x,
			y: containerRect.y + coord.y
		})

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		

		// Доска
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const isBlack = (row + col) % 2 === 0;
				ctx.fillStyle = !isBlack ? '#b58863' : '#f0d9b5';
				ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
			}
		}


		

	}, [appStore.whiteBottom, cellSize, windowSize])

	return (
		<>
			<BorderCanvas
				ref={borderCanvasRef}
				width={cellSize * 8 + borderSize * 2}
				height={cellSize * 8 + borderSize * 2}
				$top={borderSize}
				$left={borderSize}

			/>
			<Canvas
				ref={canvasRef}
				width={cellSize * 8}
				height={cellSize * 8}
			/>
		</>
	)
})

export default BoardCanvas
