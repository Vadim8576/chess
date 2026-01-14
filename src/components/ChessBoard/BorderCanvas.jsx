import { observer } from 'mobx-react-lite';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import appStore from '../../store/appStore';

const Canvas = styled.canvas`
	position: absolute;
  top: -${props => props.$top}px;
  left: -${props => props.$left}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border: 2px solid #b58863;
	border-radius: 15px;
`;



const BorderCanvas = observer(() => {
	const canvasRef = useRef(null)

	// console.log('cellsize = ',  appStore.board.cellSize)
	// console.log('borderSize = ',  appStore.board.borderSize)
	console.log('BorderCanvas Render')


	useEffect(() => {

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.width)

		ctx.fillStyle = '#b58863';
		ctx.fillRect(
			0,
			0,
			canvas.width,
			canvas.width
		)


		// Подписи: буквы (a–h) внизу
		ctx.font = `${appStore.board.cellSize * .18}px Arial`;
		ctx.textAlign = 'center';
		ctx.fillStyle = '#fff';
		for (let col = 0; col < 8; col++) {
			const value = appStore.whiteBottom === true ? (97 + col) : (104 - col)
			const letter = String.fromCharCode(value).toUpperCase(); // a, b, ..., h
			ctx.fillText(
				letter,
				col * appStore.board.cellSize + appStore.board.cellSize,
				canvas.height - appStore.board.borderSize / 2 + 8
			)
		}

		// Подписи: цифры (1–8) справа
		ctx.textAlign = 'center';
		for (let row = 0; row < 8; row++) {
			const value = appStore.whiteBottom === true ? (8 - row) : (row + 1)
			ctx.fillText(
				value,
				appStore.board.borderSize / 2 - 2,
				row * appStore.board.cellSize + appStore.board.cellSize
			)
		}

	}, [appStore.whiteBottom, appStore.board.cellSize])



	return (
		<Canvas
			ref={canvasRef}
			width={appStore.board.cellSize * 8 + appStore.board.borderSize * 2}
			height={appStore.board.cellSize * 8 + appStore.board.borderSize * 2}
			$top={appStore.board.borderSize}
			$left={appStore.board.borderSize}

		/>
	)
})

export default BorderCanvas
