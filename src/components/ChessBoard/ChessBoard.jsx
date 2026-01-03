// import './chess-board.css';
import styled from 'styled-components';
import Figure from '../Figure/Figure';
import { useEffect, useRef, useState } from 'react';


const BoardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
`;

const Board = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #333;
  margin: 0;
  padding: 0;
`;
// const Board = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   border: 2px solid #333;
//   margin: 0;
//   padding: 0;
// `;

const Figures = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Row = styled.div`
  
`;

const Square = styled.div`
  position: absolute;
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.color === 'light' ? '#f0d9b5' :
      props.color === 'dark' ? '#b58863' :
        'transparent'
  };
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;


const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// const figure = {
//   src: '/figures/rook-black.svg'
// }

const figure = {
  'bb': '/figures/bishop-black.svg',
  'bw': '/figures/bishop-white.svg',
  'kb': '/figures/king-black.svg',
  'kw': '/figures/king-white.svg',
  'nb': '/figures/knight-black.svg',
  'nw': '/figures/knight-white.svg',
  'pb': '/figures/pawn-black.svg',
  'pw': '/figures/pawn-white.svg',
  'qb': '/figures/queen-black.svg',
  'qw': '/figures/queen-white.svg',
  'rb': '/figures/rook-black.svg',
  'rw': '/figures/rook-white.svg',
}

const board = [
  ['rb', 'nb', 'bb', 'kb', 'qb', 'bb', 'nb', 'rb'],
  ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
  ['rw', 'nw', 'bw', 'kw', 'qw', 'bw', 'nw', 'rw']
]



const ChessBoard = () => {
  const [rect, setRect] = useState({ y: 0, x: 0, w: 0, h: 0 })
  const boardRef = useRef(null)


  useEffect(() => {
    console.log(boardRef)
    const rect = boardRef.current.getBoundingClientRect();
    console.log(rect)

    setRect({
      y: rect.y,
      x: rect.x,
      w: rect.width,
      h: rect.height
    })
  }, [])

  return (
    <BoardWrapper>
      <Board>
        {ranks.map((rank, y) => (
          <Row key={rank}>
            {files.map((file, x) => {
              const isLight = (rank + file.charCodeAt(0)) % 2 === 0;

              return (
                <Square
                  key={file}
                  color={isLight ? 'light' : 'dark'}
                  width={rect.w / 8}
                  height={rect.h / 8}
                  top={(rect.w / 8) * y}
                  left={(rect.w / 8) * x}
                >
                  {/* <Figure src={figure[board[y][x]]} /> */}
                </Square>
              );
            })}
          </Row>
        ))}
      </Board>
      <Figures ref={boardRef}>
        {ranks.map((rank, y) => {
          return files.map((file, x) => {
            return (
              <Figure
                key={`${file}` + '1'}
                src={figure[board[y][x]]}
                top={(rect.w / 8) * y}
                left={(rect.w / 8) * x}
                startX={rect.x}
                startY={rect.y}
              />
            );
          })
        })}
      </Figures>
    </BoardWrapper>
  );
}

export default ChessBoard;