// import './chess-board.css';
import styled from 'styled-components';
import Figure from '../Figure/Figure';

const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  border: 2px solid #333;
`;
const Row = styled.div`
  display: flex;
  flex: 1 1 0;
`;
const Square = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.color === 'light' ? '#f0d9b5' :
      props.color === 'dark' ? '#b58863' :
        'transparent'
  };
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
  return (
    <Board>
      {ranks.map((rank, y) => (
        <Row key={rank}>
          {files.map((file, x) => {
            const isLight = (rank + file.charCodeAt(0)) % 2 === 0;

            return (
              <Square
                key={file}
                color={isLight ? 'light' : 'dark'}
              >
                <Figure src={figure[board[y][x]]} />
              </Square>
            );
          })}
        </Row>
      ))}
    </Board>
  );
}

export default ChessBoard;