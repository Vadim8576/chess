import HighlightedCell from "./HighlightedCell"
import PossibleMove from "./PossibleMove";
import LastMove from "./LastMove";
import { memo } from "react";



const BacklightСells = memo(({ possibleMoves, lastMoves }) => {
  // const {possibleMoves, lastMoves, highlightedCell} = cells

  return (
    <>
      {possibleMoves.map(possibleMove => (
        <PossibleMove
          key={possibleMove.square}
          cell={possibleMove.cell}
        />
      ))}

      {lastMoves.map(lastMove => (
        <LastMove
          key={lastMove.id}
          cell={lastMove.cell}
        />
      ))}

      {/* {highlightedCell.visible && (
        <HighlightedCell
          highlightedCell={highlightedCell}
        />
      )} */}
    </>
  )
})

export default BacklightСells
