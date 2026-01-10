import { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components"
import { files, ranks } from "../../constants/boardInitial";
import Figure from "./Figure"
import HighlightedCell from "./HighlightedCell"
import { getSrc } from "../../utils/getSrc";
import appStore from "../../store/appStore";



const Figures = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;


const BoardElements = observer(({ cellSize, startX, startY }) => {

  const [highlightedCell, setHighlightedCell] = useState({
    col: 0, row: 0, color: 'green', visible: false
  })
  const [possibleMoves, setPossibleMoves] = useState({
    color: 'green', visible: false
  })





  return (
    <>
      {possibleMoves.moves && possibleMoves.moves.map(move => (
        <HighlightedCell
          key={`${move.col}${move.row}`}
          cellSize={cellSize}
          highlightedCell={{ ...move, color: possibleMoves.color, visible: possibleMoves.visible }}
        />
      ))}

      {highlightedCell.visible && (
        <HighlightedCell
          cellSize={cellSize}
          highlightedCell={highlightedCell}
        />
      )}


      <Figures>
        {ranks.map((rank, y) => {
          return files.map((file, x) => {
            const src = getSrc(appStore.whiteBottom, appStore.chess.board(), x, y)
            if (src) return (
              <Figure
                key={file + rank}
                src={src}
                top={cellSize * y}
                left={cellSize * x}
                startX={startX}
                startY={startY}
                cellSize={cellSize}
                setHighlightedCell={setHighlightedCell}
                setPossibleMoves={setPossibleMoves}
              />
            )
          })
        })}
      </Figures>
    </>
  )
})

export default BoardElements