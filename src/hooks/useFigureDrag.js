import { useState, useRef } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'

export function useFigureDrag(appStore, cellSize, startX, startY, setHighlightedCell, setPossibleMoves, setImgStyle) {
  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [moves, setmoves] = useState([])
  const imageRef = useRef(null)


  const handleMouseDown = (e) => {
    e.preventDefault();
    if (e.button !== 0) return // Только левая кнопка мыши

    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, cellSize, appStore.whiteBottom)
    const grabFigure = appStore.chess.board()[row][col]

    // moves - массив допустимых ходов для данной фигуры grabFigure
    const moves = appStore.chess.moves({ square: grabFigure.square, verbose: true }).map(m => m.to)

    console.log('Взята: ', grabFigure, ' Доступные ходы: ', moves)
    // console.log('Доступные ходы: ', moves)

    // Массив с доступными ходами в виде индексов 
    const moveIndices = moves.map(square => squareToIndices(square))

    // console.log(moveIndices)

    setmoves(moves)
    setIsDragging(true)
    setGrabCell({ col, row, square: grabFigure.square })
    setHighlightedCell({
      col,
      row,
      visible: true,
      color: 'green'
    })
    setPossibleMoves({
      moves: [...moveIndices],
      visible: true,
      color: 'lightgreen'
    })
    setImgStyle({ zIndex: 101, transition: 'none' })
  }



  const handleMouseMove = (e) => {
    if (!isDragging) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - rect.width / 2
    const yc = y - rect.height / 2
    const [col, row] = getCellPosition(x, y, cellSize, appStore.whiteBottom)

    setPosition({ x: xc, y: yc })

    // Если фигура перемещается в пределах доски
    if (col >= 0 && col <= 7 && row >= 0 && row <= 7) {
      // Получаем адрес текущей клетки, например, A7
      const square = getSquare(appStore.whiteBottom, col, row)
      // console.log(square)

      // Подсвечиваем красным, если ход сюда не доступен
      if (!moves.includes(square) && square !== grabCell.square) {
        setHighlightedCell(state => ({
          ...state,
          col,
          row,
          color: 'red'
        }))
        return
      }

      setHighlightedCell(state => ({
        ...state,
        col,
        row,
        color: 'green'
      }))
    } else {
      // если фигура вне доски, подсвечиваем первоначальную клетку
      setHighlightedCell(state => ({
        col: grabCell.col,
        row: grabCell.row,
        color: 'green',
        visible: true
      }))
    }
  }



  const handleMouseUp = (e) => {
    setIsDragging(false)
    setImgStyle({ zIndex: 100, transition: '.3s' })
    setPossibleMoves(state => ({
      ...state,
      visible: false
    }))

    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, cellSize, appStore.whiteBottom)

    if (col < 0 || col > 7 || row < 0 || row > 7) {
      console.log('Фигура вне доски')
      // Возвращаем фигуру на исходную клетку
      const colTemp = grabCell.col;
      const rowTemp = grabCell.row;
      const finalCol = appStore.whiteBottom ? colTemp : (7 - colTemp)
      const finalRow = appStore.whiteBottom ? rowTemp : (7 - rowTemp)
      setPosition({
        x: finalCol * cellSize,
        y: finalRow * cellSize
      })
      // Удаляем подсветку
      setHighlightedCell((state) => ({
        ...state,
        visible: false
      }))
      return
    }


    // Получаем адрес текущей клетки, например, A7

    const square = getSquare(appStore.whiteBottom, col, row)

    if (!moves.includes(square)) {
      console.log('Недопустимый ход!')
      const colTemp = grabCell.col;
      const rowTemp = grabCell.row;
      const finalCol = appStore.whiteBottom ? colTemp : (7 - colTemp)
      const finalRow = appStore.whiteBottom ? rowTemp : (7 - rowTemp)

      setPosition({
        x: finalCol * cellSize,
        y: finalRow * cellSize
      })

      setHighlightedCell((state) => ({
        ...state,
        visible: false
      }))
      return
    }

    // Ставим фигуру на новую клетку
    const colTemp = Math.floor(x / cellSize)
    const rowTemp = Math.floor(y / cellSize)
    const newX = cellSize * colTemp
    const newY = cellSize * rowTemp

    setPosition({ x: newX, y: newY })
    setHighlightedCell((state) => ({
      ...state,
      visible: false
    }))

    console.log(grabCell.square, square)
    appStore.chess.move(grabCell.square + square)


    /*********************************************************************/
    /*
    function getGameStatus(game) {
      if (game.gameOver()) {
        if (game.isCheckmate()) {
          console.log('Мат! Игра окончена.');
        } else if (game.inStalemate()) {
          console.log('Пат! Ничья.');
        } else if (game.inThreefoldRepetition()) {
          console.log('Троекратное повторение. Ничья.');
        } else if (game.inFiftyMoveRule()) {
          console.log('Правило 50 ходов. Ничья.');
        } else {
          console.log('Игра окончена (другая причина).');
        }
      } else {
        console.log('Игра продолжается.');
      }

    // За последние 50 ходов не было ни одного взятия и ни одной пешки, перемещённой вперёд.
    //game.inFiftyMoveRule()

    // автоматическая ничья - Ни один из игроков не может поставить мат любой последовательностью ходов
    // (например, король + слон против короля).

    return 'Игра продолжается.';
  }

  // Пример использования
  const game = new Chess('4k3/8/8/8/8/8/4K3/4Q3 b - - 0 1');
  console.log(getGameStatus(game)); // 'Мат! Игра завершена.'

  */
}

return {
  isDragging,
  position,
  imageRef,
  setPosition,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp
};
}
