import PossibleMove from "./PossibleMove";
import LastMove from "./LastMove";
import { memo } from "react";
import appStore from "../../../store/appStore";
import { observer } from "mobx-react-lite";



const BacklightСells = memo(observer(({
  fugureMove,
  grabCell
}) => {


  return (
    <>
      {appStore.possibleMoves && appStore.possibleMoves.map(possibleMove => (
        <PossibleMove
          key={crypto.randomUUID()}
          cell={possibleMove.cell}
          fugureMove={fugureMove}
          grabCell={grabCell}
        />
      ))}

      {appStore.lastMoveCells && appStore.lastMoveCells.map(lastMove => (
        <LastMove
          key={crypto.randomUUID()}
          cell={lastMove.cell}
        />
      ))}
    </>
  )
}))

export default BacklightСells
