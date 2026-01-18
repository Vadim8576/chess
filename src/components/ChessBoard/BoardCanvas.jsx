import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import appStore from '../../store/appStore';


const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
  border: 1px solid #f0d9b5;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;


const BoardCanvas = observer(() => {

	console.log('BoardCanvas Render')

	const canvasRef = useRef(null)

	useEffect(() => {
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
				id='board'
				ref={canvasRef}
				width={appStore.board.cellSize * 8}
				height={appStore.board.cellSize * 8}
			/>
		</>
	)
})

export default BoardCanvas
