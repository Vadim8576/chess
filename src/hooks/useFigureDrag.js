import { useState, useRef, memo } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'


let mouseDownCount = 0
export const useFigureDrag = (
  appStore,
  setHighlightedCell,
  setPossibleMoves,
  getGameStatus,
  setPosition,
  setImgStyle,
  activeFigure,
  setFigures,
  setLastMoves
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
  const [moves, setmoves] = useState([])


  const handleMouseDown = (e) => {
    e.preventDefault();

    if (appStore.chess.isGameOver()) return

    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - appStore.board.cellSize / 2
    const yc = y - appStore.board.cellSize / 2



    setFigures(state => state.map(figure => {
      if (figure.id === activeFigure.id) return { ...figure, top: yc, left: xc }
      return figure
    }))

    const [col, row] = getCellPosition(x, y, appStore)
    const grabFigure = appStore.chess.board()[row][col]
    if (e.button !== 0) return // Только левая кнопка мыши
    if (!grabFigure) return


    // console.log(grabFigure)
    // console.log(col, row)



    console.log('activeFigure.square = ', activeFigure.square)
    console.log('grabFigure.square = ', grabFigure.square)

    // if (activeFigure.square !== grabFigure.square) {
    //   console.log('Взял одну фигуру, а по расчетам другая')
    //   return
    // }

    if (grabFigure.color !== appStore.chess.turn()) {
      console.log('Сейчас ход другого игрока!')
      // return
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

    mouseDownCount++
    setImgStyle({ zIndex: 101, transition: 'none' })
  }



  const handleMouseMove = (e) => {
    if (!isDragging) return

    console.log('activeFigure = ', activeFigure)

    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - appStore.board.cellSize / 2
    const yc = y - appStore.board.cellSize / 2
    const [col, row] = getCellPosition(x, y, appStore)

    const square = getSquare(appStore.whiteBottom, col, row)

    // console.log('Фигура на:', square)

    // setPosition({ x: xc, y: yc })

    setFigures(state => state.map(figure => {
      if (figure.id === activeFigure.id) return { ...figure, top: yc, left: xc }
      return figure
    }))


    // Если фигура перемещается в пределах доски
    if (col >= 0 && col <= 7 && row >= 0 && row <= 7) {
      // Получаем адрес текущей клетки, например, A7
      // const square = getSquare(appStore.whiteBottom, col, row)
      // console.log(square)

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



  const handleMouseUp = (e) => {
    setIsDragging(false)
    setImgStyle({ zIndex: 100, transition: 'none' })
    setPossibleMoves(state => ({
      ...state,
      visible: false
    }))

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
      // Возвращаем фигуру на исходную клетку
      const colTemp = grabCell.col;
      const rowTemp = grabCell.row;
      const finalCol = appStore.whiteBottom ? colTemp : (7 - colTemp)
      const finalRow = appStore.whiteBottom ? rowTemp : (7 - rowTemp)


      // setPosition({
      //   x: finalCol * appStore.board.cellSize,
      //   y: finalRow * appStore.board.cellSize
      // })

      setFigures(state => state.map(figure => {
        if (figure.id === activeFigure.id) return {
          ...figure,
          top: finalRow * appStore.board.cellSize,
          left: finalCol * appStore.board.cellSize
        }
        return figure
      }))


      // Удаляем подсветку
      setHighlightedCell((state) => ({
        ...state,
        visible: false
      }))
      return
    }


    // Ставим фигуру на новую клетку
    const colTemp = Math.floor(x / appStore.board.cellSize)
    const rowTemp = Math.floor(y / appStore.board.cellSize)
    const newX = appStore.board.cellSize * colTemp
    const newY = appStore.board.cellSize * rowTemp


    console.log(col, row, newX, newY)

    // setPosition(null)
    // setPosition({ x: newX, y: newY })

    setFigures(state => state.map(figure => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log('activeFigure.id = ', activeFigure.id)
      if (figure.id === activeFigure.id) return { ...figure, top: newY, left: newX }
      return figure
    }))


    setHighlightedCell((state) => ({
      ...state,
      visible: false
    }))


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
      // console.log('съел фигуру')
      // console.log(capturedFigure.color, `${capturedFigure.type}${capturedFigure.color}` )
      appStore.addCapturedFigures(capturedFigure.color, `${capturedFigure.type}${capturedFigure.color}`)
    }

    // console.log(appStore.chess.history({ verbose: true }))

    appStore.updateHistoryList(appStore.chess.history({ verbose: true }))

    getGameStatus()

  }

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}
