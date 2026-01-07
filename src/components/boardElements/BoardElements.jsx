import { useState } from "react";
import { files, ranks, figure, board } from "../../constants/boardInitial";
import styled from "styled-components"
import Figure from "./Figure"
import HighlightedCell from "./HighlightedCell"


const Figures = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;


const BoardElements = ({ cellSize, startX, startY }) => {

  const [highlightedCell, setHighlightedCell] = useState({ col: 0, row: 0, visible: false })


  return (
    <>
      <HighlightedCell
        cellSize={cellSize}
        highlightedCell={highlightedCell}
      />

      <Figures>
        {ranks.map((rank, y) => {
          return files.map((file, x) => {
            return (
              <Figure
                key={file + rank}
                src={figure[board[y][x]]}
                top={cellSize * y}
                left={cellSize * x}
                startX={startX}
                startY={startY}
                cellSize={cellSize}
                setHighlightedCell={setHighlightedCell}
              />
            )
          })
        })}
      </Figures>
    </>
  )
}

export default BoardElements