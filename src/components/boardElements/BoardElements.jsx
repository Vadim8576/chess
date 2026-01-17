import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components"
import { files, ranks } from "../../constants/gameInitial";
import Figure from "./Figure"
import HighlightedCell from "./HighlightedCell"
import { getSrc } from "../../utils/getSrc";
import appStore from "../../store/appStore";
import useGameStatus from "../../hooks/useGameStatus";


const ElementsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BoardElements = observer(() => {

  const board = appStore.chess.board()


  console.log('BoardElements')

  const [highlightedCell, setHighlightedCell] = useState({
    col: 0,
    row: 0,
    color: 'green',
    visible: false
  })

  const [possibleMoves, setPossibleMoves] = useState({
    color: 'green',
    visible: false
  })


  const getGameStatus = useGameStatus(appStore)


  useEffect(() => {
    getGameStatus()
  }, [appStore.whiteBottom])



  return (
    <ElementsWrapper>
      {possibleMoves.moves && possibleMoves.moves.map(move => (
        <HighlightedCell
          key={`${move.col}${move.row}`}
          highlightedCell={{
            ...move,
            color: possibleMoves.color,
            visible: possibleMoves.visible
          }}
          type={'possibleMoves'}
        />
      ))}

      {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
          type={'highlightedCell'}
        />
      )}

      {ranks.map((rank, y) => {
        return files.map((file, x) => {          
          const figure = board[y][x]
          const src = getSrc(appStore.whiteBottom, board, x, y)
          if (src) return (
            <Figure
              key={`${file}${rank}`}
              src={src}
              top={appStore.board.cellSize * y}
              left={appStore.board.cellSize * x}
              setHighlightedCell={setHighlightedCell}
              setPossibleMoves={setPossibleMoves}
              getGameStatus={getGameStatus}
              figure={figure}
            />
          )
        })
      })}
    </ElementsWrapper>
  )
})

export default BoardElements