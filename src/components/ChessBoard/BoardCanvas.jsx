import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  border: 2px solid #b58863;
  display: block;
  z-index: 10;
`;

const BoardCanvas = ({ cellSize }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isBlack = (row + col) % 2 === 0;
        ctx.fillStyle = isBlack ? '#b58863' : '#f0d9b5';

        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }


  }, [cellSize])

  return (
    <Canvas
      ref={canvasRef}
      width={cellSize * 8}
      height={cellSize * 8}
    />
  );
};

export default BoardCanvas
