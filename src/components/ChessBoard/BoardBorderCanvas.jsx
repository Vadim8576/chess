import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  border: 2px solid #b58863;
  display: block;
  position: absolute;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
`;

const BoardBorderCanvas = ({ width, borderSize }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0d9b5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Подписи: буквы (a–h) внизу
        const cellSize = width / 8
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#b58863';
        for (let col = 0; col < 8; col++) {
            const letter = String.fromCharCode(97 + col); // a, b, ..., h
            ctx.fillText(
                letter,
                col * cellSize + borderSize,
                canvas.height - 10
            );
        }

        // Подписи: цифры (1–8) справа
        ctx.textAlign = 'center';
        for (let row = 0; row < 8; row++) {
            ctx.fillText(
                8 - row,
                borderSize / 4,
                row * cellSize + borderSize
            );
        }

    }, [width])

    return (
        <Canvas
            ref={canvasRef}
            width={(width + borderSize)}
            height={(width + borderSize)}
            $top={-borderSize / 2}
            $left={-borderSize / 2}
        />
    );
};

export default BoardBorderCanvas
