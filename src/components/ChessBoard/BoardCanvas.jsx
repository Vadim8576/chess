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


const BoardCanvas = observer(({ setBoardRect }) => {
	const canvasRef = useRef(null)

	// console.log('cellsize = ',  appStore.board.cellSize)
	// console.log('borderSize = ',  appStore.board.borderSize)
	console.log('BoardCanvas Render')


	useEffect(() => {
		const boardRect = canvasRef.current.getBoundingClientRect()

		setBoardRect({
			w: boardRect.width,
			h: boardRect.height,
			x: boardRect.x,
			y: boardRect.y
		})

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		

		// Доска
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const isBlack = (row + col) % 2 === 0;
				ctx.fillStyle = !isBlack ? '#b58863' : '#f0d9b5';
				ctx.fillRect(col * appStore.board.cellSize, row * appStore.board.cellSize, appStore.board.cellSize, appStore.board.cellSize)
			}
		}


		

	}, [appStore.whiteBottom, appStore.board.cellSize])

	return (
		<>
			<Canvas
				ref={canvasRef}
				width={appStore.board.cellSize * 8}
				height={appStore.board.cellSize * 8}
			/>
		</>
	)
})

export default BoardCanvas
