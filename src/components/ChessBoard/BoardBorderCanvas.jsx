import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import appStore from '../../store/appStore';

const Canvas = styled.canvas`
  border: 2px solid #b58863;
  display: block;
`;
// const Canvas = styled.canvas`
//   border: 2px solid #b58863;
//   display: block;
//   position: relative;
//   top: ${props => props.$top}px;
//   left: ${props => props.$left}px;
// `;

const BoardBorderCanvas = observer(({ width, cellSize }) => {
    const canvasRef = useRef(null)
    // console.log('w = ', width)

    // console.log('BoardBorderCanvas Render', 'белые внизу? ', appStore.whiteBottom)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#f0d9b5'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Подписи: буквы (a–h) внизу
        // const cellSize = width / 8
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#b58863';
        for (let col = 0; col < 8; col++) {
            const value = appStore.whiteBottom === true ? (97 + col) : (104 - col)
            const letter = String.fromCharCode(value); // a, b, ..., h
            ctx.fillText(
                letter,
                col * cellSize + cellSize,
                canvas.height - 10
            )
        }

        // Подписи: цифры (1–8) справа
        ctx.textAlign = 'center';
        for (let row = 0; row < 8; row++) {
            const value = appStore.whiteBottom === true ? (8 - row) : (row + 1)
            ctx.fillText(
                value,
                cellSize / 4,
                row * cellSize + cellSize
            )
        }





        // Доска
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isBlack = (row + col) % 2 === 0;
                ctx.fillStyle = !isBlack ? '#b58863' : '#f0d9b5';

                ctx.fillRect(cellSize / 2 + col * cellSize, cellSize / 2 + row * cellSize, cellSize, cellSize);

                // ctx.strokeStyle = '#ccc';
                // ctx.lineWidth = 1;
                // ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }

        ctx.strokeStyle = '#b58863';
        ctx.lineWidth = 1;
        ctx.strokeRect(cellSize / 2, cellSize / 2, cellSize * 8, cellSize * 8);

    }, [appStore.whiteBottom, width])

    return (
        <Canvas
            ref={canvasRef}
            width={(width)}
            height={(width)}
        />
    )
})

export default BoardBorderCanvas
