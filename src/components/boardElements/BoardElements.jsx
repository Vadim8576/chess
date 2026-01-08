import { useState } from "react";
import { files, ranks } from "../../constants/boardInitial";
import styled from "styled-components"
import Figure from "./Figure"
import HighlightedCell from "./HighlightedCell"
import { getSrc } from "../../utils/getSrc";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";



const Figures = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;


const BoardElements = observer(({ cellSize, startX, startY }) => {

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
            const src = getSrc(appStore.currentPlayer, appStore.board, x, y)
            return (
              <div key={file + rank}>
                {src && <Figure           
                  src={src}
                  top={cellSize * y}
                  left={cellSize * x}
                  startX={startX}
                  startY={startY}
                  cellSize={cellSize}
                  setHighlightedCell={setHighlightedCell}
                />}
              </div>
            )
          })
        })}
      </Figures>
    </>
  )
})

export default BoardElements