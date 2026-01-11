import { useEffect, useState } from "react";
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


  const getGameStatus = () => {
    appStore.setGameStatus('w', '')
    appStore.setGameStatus('b', '')
    const player = appStore.chess.turn()

    if (appStore.chess.inCheck()) {
      appStore.setGameStatus(player, 'Шах!')
    }

    if (appStore.chess.isCheckmate()) {
      appStore.setGameStatus(player, 'Мат!')
    }

    if (appStore.chess.isStalemate()) {
      const status = 'Пат. Ничья!'
      appStore.setGameStatus('w', status)
      appStore.setGameStatus('b', status)
    }

    if (appStore.chess.isThreefoldRepetition()) {
      const status = 'Троекратное повторение. Ничья!'
      appStore.setGameStatus('w', status)
      appStore.setGameStatus('b', status)
    }

    if (appStore.chess.isDraw()) {
      const status = 'Правило 50 ходов. Ничья!'
      appStore.setGameStatus('w', status)
      appStore.setGameStatus('b', status)
    }


    if (appStore.chess.isGameOver()) {
      console.log('Игра окончена.')
    }
  }


  return (
    <>
      {possibleMoves.moves && possibleMoves.moves.map(move => (
        <HighlightedCell
          key={`${move.col}${move.row}`}
          cellSize={cellSize}
          highlightedCell={{ ...move, color: possibleMoves.color, visible: possibleMoves.visible }}
          startX={startX}
          startY={startY}
        />
      ))}

      {highlightedCell.visible && (
        <HighlightedCell
          cellSize={cellSize}
          highlightedCell={highlightedCell}
          startX={startX}
          startY={startY}
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
                top={startY + cellSize * y}
                left={startX + cellSize * x}
                startX={startX}
                startY={startY}
                cellSize={cellSize}
                setHighlightedCell={setHighlightedCell}
                setPossibleMoves={setPossibleMoves}
                getGameStatus={getGameStatus}
              />
            )
          })
        })}
      </Figures>
    </>
  )
})

export default BoardElements