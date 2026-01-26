import PossibleMove from "./PossibleMove";
import LastMove from "./LastMove";
import { memo } from "react";



const BacklightСells = memo(({ possibleMoves, lastMoveCells }) => {

  console.log('lastMoveCells = ', lastMoveCells)

  return (
    <>
      {possibleMoves.map(possibleMove => (
        <PossibleMove
          key={possibleMove.square}
          cell={possibleMove.cell}
        />
      ))}

      {lastMoveCells.map(lastMove => (
        <LastMove
          key={lastMove.id}
          cell={lastMove.cell}
        />
      ))}
    </>
  )
})

export default BacklightСells
