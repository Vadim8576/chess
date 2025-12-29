import React from 'react';
import './chess-board.css';

function ChessBoard() {
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <div className="board">
      {ranks.map(rank => (
        <div key={rank} className="row">          {/* ряд = строка */}
          {files.map(file => {
            const isLight = (rank + file.charCodeAt(0)) % 2 === 0;
            return (
              <div
                key={file}
                className={`square ${isLight ? 'light' : 'dark'}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;