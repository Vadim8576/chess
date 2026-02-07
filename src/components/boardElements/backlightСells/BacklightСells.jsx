import PossibleMove from "./PossibleMove";
import LastMove from "./LastMove";
import { memo, useRef, useState } from "react";
import AppStore from "../../../store/AppStore";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';


const BacklightCells = memo(observer(({
  fugureMove,
  grabCell
}) => {
// const [secondClick, setSecondClick] = useState(false)

// console.log(toJS(AppStore.possibleMoves))

  return (
    <>
      {AppStore.possibleMoves.length > 0 && AppStore.possibleMoves.map(possibleMove => (
        <PossibleMove
          key={possibleMove.id}
          cell={possibleMove.cell}
          fugureMove={fugureMove}
          grabCell={grabCell}
        />
      ))}

      {AppStore.lastMoveCells.length > 0 && AppStore.lastMoveCells.map(lastMove => (
        <LastMove
          key={crypto.randomUUID()}
          cell={lastMove.cell}
        />
      ))}
    </>
  );
}));

export default BacklightCells
