import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import appStore from '../../store/appStore';

const Canvas = styled.canvas`
  border: 2px solid #b58863;
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;


const BoardCanvas = observer(({ cellSize, setBoardRect, containerRect }) => {
	const canvasRef = useRef(null)


	 console.log('BoardCanvas Render')

	useEffect(() => {
		const boardRect = canvasRef.current.getBoundingClientRect()
    // console.log(boardRect)
    setBoardRect(state => ({
			...state,
      x: boardRect.x,
      y: boardRect.y
    }))

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)


		// Доска
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const isBlack = (row + col) % 2 === 0;
				ctx.fillStyle = !isBlack ? '#b58863' : '#f0d9b5';
				ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
			}
		}

		// Подписи: буквы (a–h) внизу
		// const cellSize = width / 8
		ctx.font = `${cellSize*.2}px Arial`;
		ctx.textAlign = 'center';
		ctx.fillStyle = '#000';
		for (let col = 0; col < 8; col++) {
			const value = appStore.whiteBottom === true ? (97 + col) : (104 - col)
			const letter = String.fromCharCode(value); // a, b, ..., h
			ctx.fillText(
				letter,
				col * cellSize + cellSize - 10,
				canvas.height - 5
			)
		}

		// Подписи: цифры (1–8) справа
		ctx.textAlign = 'center';
		for (let row = 0; row < 8; row++) {
			const value = appStore.whiteBottom === true ? (8 - row) : (row + 1)
			ctx.fillText(
				value,
				5,
				row * cellSize + 15
			)
		}

	}, [appStore.whiteBottom, cellSize, containerRect])

	return (
		<Canvas
			ref={canvasRef}
			width={cellSize * 8}
			height={cellSize * 8}
		/>
	)
})

export default BoardCanvas
