import PossibleMove from "./PossibleMove";
import LastMove from "./LastMove";
import { memo, useRef, useState } from "react";
import appStore from "../../../store/appStore";
import { observer } from "mobx-react-lite";



const BacklightCells = memo(observer(({
  fugureMove,
  grabCell
}) => {


  return (
    <div>
      {appStore.possibleMoves.length > 0 && appStore.possibleMoves.map(possibleMove => (
        <PossibleMove
          key={crypto.randomUUID()}
          cell={possibleMove.cell}
          fugureMove={fugureMove}
          grabCell={grabCell}
        />
      ))}

      {appStore.lastMoveCells.length > 0 && appStore.lastMoveCells.map(lastMove => (
        <LastMove
          key={crypto.randomUUID()}
          cell={lastMove.cell}
        />
      ))}
    </div>
  );
}));

export default BacklightCells
