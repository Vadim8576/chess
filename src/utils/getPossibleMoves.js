import { getSquare } from "./getSquare"
import { squareToIndices } from "./squareToIndices"

export const getPossibleMoves = (appStore, grabFigureSquare) => {

  
  // const square = getSquare(appStore.whiteBottom, col, row)
    // movesTemp - массив допустимых ходов для данной фигуры grabFigure. verbose: true - возвращает объект
    const movesTemp = appStore.chess.moves({ square: grabFigureSquare, verbose: true }).map(m => m.to)
    if (movesTemp.length <= 0) {
      console.log('Нет доступного хода для этой фигуры!')
      // return
    }
    const moves = [...movesTemp, grabFigureSquare] // Добавляем клетку, с которой взяли фигуру, для ее подсветки

    // console.log('Взята: ', grabFigure, ' Доступные ходы: ', moves)

    // Массив с доступными ходами в виде индексов [cell: {0, 5}, id, cell: {...}, square...] -  координаты клетки в массиве доски
    const moveIndices = moves.map(square => ({ cell: squareToIndices(square), id: square }))
    // setPossibleMoves([...moveIndices])

    // console.log(moveIndices)

    // setLastMoveCells([{ col, row, square: grabFigure.square }])

    return [...moveIndices]
}

