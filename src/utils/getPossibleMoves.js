import { getSquare } from "./getSquare"
import { squareToIndices } from "./squareToIndices"

export const getPossibleMoves = (AppStore, grabFigureSquare) => {
    // movesTemp - массив допустимых ходов для данной фигуры grabFigure. verbose: true - возвращает объект
    // const movesTemp = AppStore.chess.moves({ square: grabFigureSquare, verbose: true }).map(m => m.to)
    const movesTemp = AppStore.chess.moves({ square: grabFigureSquare, verbose: true }).map(m => {
      // console.log(m)
     return {to: m.to, promotion: m.promotion}
    })

    if (movesTemp.length < 1) {
      console.log('Нет доступного хода для этой фигуры!')
    }
    console.log(movesTemp)

    
    const moves = [...movesTemp, {to: grabFigureSquare, promotion: undefined}] // Добавляем клетку, с которой взяли фигуру, для ее подсветки
    // Массив с доступными ходами в виде индексов [cell: {0, 5}, id, cell: {...}, square...] -  координаты клетки в массиве доски
    const moveIndices = moves.map((square, i) => ({ cell: squareToIndices(square.to), id: `${square.to}_${i}` }))

    return [...moveIndices]
}

