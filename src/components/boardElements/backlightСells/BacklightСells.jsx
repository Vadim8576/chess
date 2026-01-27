import PossibleMove from "./PossibleMove";
import LastMove from "./LastMove";
import { memo } from "react";



const BacklightСells = memo(({
  fugureMove,
  grabCell,
  possibleMoves,
  lastMoveCells
}) => {

  console.log('lastMoveCells = ', lastMoveCells)

  return (
    <>
      {possibleMoves && possibleMoves.map(possibleMove => (
        <PossibleMove
          key={possibleMove.id}
          cell={possibleMove.cell}
          fugureMove={fugureMove}
          grabCell={grabCell}
        />
      ))}

      {lastMoveCells && lastMoveCells.map(lastMove => (
        <LastMove
          key={lastMove.id}
          cell={lastMove.cell}
        />
      ))}
    </>
  )
})

export default BacklightСells
