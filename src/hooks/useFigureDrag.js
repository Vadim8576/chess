import { useState, useRef } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'

export function useFigureDrag(
  figure,
  appStore,
  setHighlightedCell,
  setPossibleMoves,
  setImgStyle,
  getGameStatus
) {
  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [moves, setmoves] = useState([])
  const imageRef = useRef(null)


  const handleMouseDown = (e) => {
    e.preventDefault();
    if (e.button !== 0) return // Только левая кнопка мыши
    if (appStore.chess.isGameOver()) return

    // const boardRect = document.getElementById('board').getBoundingClientRect()
    const startX = appStore.board.x
    const startY = appStore.board.y

    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, appStore)



    const grabFigure = appStore.chess.board()[row][col]

    // console.log(x, y, appStore.board.cellSize)
    console.log(col, row)
    // console.log(figure)

    if (figure.square !== grabFigure.square) {
      console.log('Взял одну фигуру, а по расчетам другая')
      return
    }


    if (grabFigure.color !== appStore.chess.turn()) {
      console.log('Сейчас ход другого игрока!')
      return
    }

    // moves - массив допустимых ходов для данной фигуры grabFigure. verbose: true - возвращает объект
    const movesTemp = appStore.chess.moves({ square: grabFigure.square, verbose: true }).map(m => m.to)
    if (movesTemp.length <= 0) {
      console.log('Нет доступного хода для этой фигуры!')
      return
    }
    const square = getSquare(appStore.whiteBottom, col, row)

    const moves = [...movesTemp, square] // Добавляем клетку, с которой взяли фигуру, для ее подсветки

    console.log('Взята: ', grabFigure, ' Доступные ходы: ', moves)



    // Массив с доступными ходами в виде индексов [{0, 5},{...}] -  координаты клетки в массиве доски
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
      color: 'lightgreen',

    })
    // setImgStyle({ zIndex: 101, transition: 'none' })
  }



  const handleMouseMove = (e) => {
    if (!isDragging) return

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

    // Если фигура перемещается в пределах доски
    if (col >= 0 && col <= 7 && row >= 0 && row <= 7) {
      // Получаем адрес текущей клетки, например, A7
      // const square = getSquare(appStore.whiteBottom, col, row)
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
      setHighlightedCell({
        col: grabCell.col,
        row: grabCell.row,
        color: 'green',
        visible: true
      })
    }
  }



  const handleMouseUp = (e) => {
    setIsDragging(false)
    // setImgStyle({ zIndex: 100, transition: '.3s' })
    setPossibleMoves(state => ({
      ...state,
      visible: false
    }))

    const startX = appStore.board.x
    const startY = appStore.board.y

    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, appStore)


    if (col < 0 || col > 7 || row < 0 || row > 7) {
      console.log('Фигура вне доски')
      // Возвращаем фигуру на исходную клетку
      const colTemp = grabCell.col;
      const rowTemp = grabCell.row;
      const finalCol = appStore.whiteBottom ? colTemp : (7 - colTemp)
      const finalRow = appStore.whiteBottom ? rowTemp : (7 - rowTemp)
      setPosition({
        x: finalCol * appStore.board.cellSize,
        y: finalRow * appStore.board.cellSize
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
    // console.log('Отпущено на:', square)



    if (!moves.includes(square) || grabCell.square === square) {
      console.log('Недопустимый ход!')
      const colTemp = grabCell.col;
      const rowTemp = grabCell.row;
      const finalCol = appStore.whiteBottom ? colTemp : (7 - colTemp)
      const finalRow = appStore.whiteBottom ? rowTemp : (7 - rowTemp)

      setPosition({
        x: finalCol * appStore.board.cellSize,
        y: finalRow * appStore.board.cellSize
      })

      setHighlightedCell((state) => ({
        ...state,
        visible: false
      }))
      return
    }

    // Ставим фигуру на новую клетку
    const colTemp = Math.floor(x / appStore.board.cellSize)
    const rowTemp = Math.floor(y / appStore.board.cellSize)
    const newX = appStore.board.cellSize * colTemp + startX
    const newY = appStore.board.cellSize * rowTemp + startY

    setPosition({ x: newX, y: newY })
    setHighlightedCell((state) => ({
      ...state,
      visible: false
    }))



    let capturedFigure = appStore.chess.board()[row][col]

    console.log(grabCell.square, square)
    const move = appStore.chess.move(grabCell.square + square) // Сделать ход

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

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // не срабатывает
    // setImgStyle({ zIndex: 100, transition: 'none' })


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
