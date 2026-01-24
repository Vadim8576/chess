import { useState } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'



export const useFigureDrag = (
  appStore,
  getGameStatus,
  setDraggedFigure,
  setHighlightedCell,
  setPossibleMoves,
  setPosition,
  setLastMoves
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
  const [moves, setmoves] = useState([])
  const [activeFigure, setActiveFigure] = useState({ square: null, id: null })


  const handlePointerDown = (e, currentFigureSquare) => {

    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - appStore.board.cellSize / 2
    const yc = y - appStore.board.cellSize / 2
    const [col, row] = getCellPosition(x, y, appStore)


    console.log(startX, startY)
    console.log(x, y)
    console.log(col, row)

    const grabFigure = appStore.chess.board()[row][col]

    if (!grabFigure) return

    setPosition({ x: xc, y: yc })


    // console.log('!!!!!', currentFigureSquare, grabFigure.square)


    if (currentFigureSquare !== grabFigure.square) {
      console.log('Взял одну фигуру, а по расчетам другая')
      resetMove()
      return
    }

    if (grabFigure.color !== appStore.chess.turn()) {
      console.log('Сейчас ход другого игрока!')
      resetMove()
      return
    }

    // movesTemp - массив допустимых ходов для данной фигуры grabFigure. verbose: true - возвращает объект
    const movesTemp = appStore.chess.moves({ square: grabFigure.square, verbose: true }).map(m => m.to)
    if (movesTemp.length <= 0) {
      console.log('Нет доступного хода для этой фигуры!')
      // return
    }
    const square = getSquare(appStore.whiteBottom, col, row)
    console.log(square)
    const moves = [...movesTemp, square] // Добавляем клетку, с которой взяли фигуру, для ее подсветки

    console.log('Взята: ', grabFigure, ' Доступные ходы: ', moves)


    // Массив с доступными ходами в виде индексов [cell: {0, 5}, id, cell: {...}, id...] -  координаты клетки в массиве доски
    const moveIndices = moves.map(square => ({ cell: squareToIndices(square), id: square }))

    // console.log(moveIndices)

    setmoves(moves)
    setIsDragging(true)
    setGrabCell({ col, row, square: grabFigure.square })

    setHighlightedCell({
      cell: {
        col,
        row,
      },
      visible: true,
      color: 'green'
    })

    setPossibleMoves({
      moves: [...moveIndices],
      visible: true
    })

  }



  const handlePointerMove = (e) => {

    if (!isDragging) return
    // e.preventDefault()

    // if (!(e.button === 0) && e.pointerType !== 'touch') {
    //   setDraggedFigure({ src: null, id: null })
    //   return
    // }
    // console.log('activeFigure = ', activeFigure)

    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - appStore.board.cellSize / 2
    const yc = y - appStore.board.cellSize / 2
    const [col, row] = getCellPosition(x, y, appStore)

    const square = getSquare(appStore.whiteBottom, col, row)

    // console.log('Фигура на:', square)

    setPosition({ x: xc, y: yc })

    // setFigures(state => state.map(figure => {
    //   if (figure.id === activeFigure.id) return { ...figure, top: yc, left: xc }
    //   return figure
    // }))


    // Если фигура перемещается в пределах доски
    if (col >= 0 && col <= 7 && row >= 0 && row <= 7) {
      // Получаем адрес текущей клетки, например, A7
      // const square = getSquare(appStore.whiteBottom, col, row)
      // console.log(square)


      // console.log('Двигаем фигуру!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

      // Подсвечиваем красным, если ход сюда не доступен
      if (!moves.includes(square) && square !== grabCell.square) {
        setHighlightedCell(prev => {
          if (prev.cell.col === col && prev.cell.row === row) return prev
          return {
            ...prev,
            cell: { col, row },
            color: 'red'
          }
        })
        return
      }

      setHighlightedCell(state => ({
        ...state,
        cell: { col, row },
        color: 'green'
      }))

    } else {
      // если фигура вне доски, подсвечиваем первоначальную клетку
      setHighlightedCell({
        cell: {
          col: grabCell.col,
          row: grabCell.row,
        },
        color: 'green',
        visible: true
      })

    }
  }



  const handlePointerUp = (e) => {

    resetMove()

    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, appStore)
    const square = getSquare(appStore.whiteBottom, col, row) // Получаем адрес текущей клетки, например, A7
    // console.log('Отпущено на:', square)

    if (col === grabCell.col && row === grabCell.row) {
      console.log('Поставил туда же, где взял!')
    }

    if (col < 0 || col > 7 || row < 0 || row > 7 || (!moves.includes(square) || grabCell.square === square)) {
      console.log('Фигура вне доски или недопустимый ход')
      return
    }


    setLastMoves([
      {
        col: grabCell.col,
        row: grabCell.row
      },
      {
        col: grabCell.col,
        row: grabCell.row
      }
    ])



    let capturedFigure = appStore.chess.board()[row][col]
    const move = appStore.chess.move(grabCell.square + square) // Сделать ход

    console.log(grabCell.square, square)

    // если присутствует flags 'e', произошло взятие на проходе
    if (move && move.flags.includes('e')) {
      console.log('Взятие на проходе!')
      capturedFigure = {
        type: 'p',
        color: move.color === 'w' ? 'b' : 'w'
      }
    }

    if (capturedFigure != null || capturedFigure != undefined) {
      appStore.addCapturedFigures(capturedFigure.color, `${capturedFigure.type}${capturedFigure.color}`)
    }
    appStore.updateHistoryList(appStore.chess.history({ verbose: true }))

    getGameStatus()
  }

  const handlePointerCancel = () => {
    resetMove()
  }


  function resetMove() {
    setIsDragging(false)
    setDraggedFigure({ src: null, id: null })
    setHighlightedCell((state) => ({
      ...state,
      visible: false
    }))
    setPossibleMoves([])
  }

  return {
    isDragging,
    setActiveFigure,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  }
}
