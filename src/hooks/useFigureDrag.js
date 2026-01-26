import { useCallback, useState } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'
import { COLORS } from '../constants/gameInitial'



export const useFigureDrag = (
  appStore,
  getGameStatus,
  setDraggedFigure
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
  const [position, setPosition] = useState([])
  const [lastMoveCells, setLastMoveCells] = useState([])
  const [possibleMoves, setPossibleMoves] = useState([])
  const [highlightedCell, setHighlightedCell] = useState({
    col: 0,
    row: 0,
    visible: false
  })
  const [cellInCheck, setCellInCheck] = useState({
    col: 0,
    row: 0,
    visible: false
  })


  const handlePointerDown = useCallback((e, currentFigureSquare) => {

    
    

    
    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - appStore.board.cellSize / 2
    const yc = y - appStore.board.cellSize / 2
    const [col, row] = getCellPosition(x, y, appStore)


    // console.log('Координаты доски', startX, startY)
    // console.log(x, y)
    // console.log(col, row)

    const grabFigure = appStore.chess.board()[row][col]

    if (!grabFigure) return


    const isCurrentPlayer = grabFigure.color === appStore.chess.turn()

    if (!isCurrentPlayer) {
      console.log('Сейчас ход другого игрока!')
      setDraggedFigure({ src: null, id: null })
      return
    }


    console.log(lastMoveCells, lastMoveCells.length, '!==', isCurrentPlayer, lastMoveCells.length !== 0 && isCurrentPlayer)


    if(lastMoveCells.length !== 0 && isCurrentPlayer) {
      setLastMoveCells([])

      console.log('Взял свою же фигуру')
    }


    setPosition({ x: xc, y: yc })


    console.log('!!!!!', 'физически ', currentFigureSquare, 'по расчету ', grabFigure.square)


    if (currentFigureSquare !== grabFigure.square) {
      console.log('Взял одну фигуру, а по расчетам другая')
      setDraggedFigure({ src: null, id: null })
      return
    }

  

    const square = getSquare(appStore.whiteBottom, col, row)
    // movesTemp - массив допустимых ходов для данной фигуры grabFigure. verbose: true - возвращает объект
    const movesTemp = appStore.chess.moves({ square: grabFigure.square, verbose: true }).map(m => m.to)
    if (movesTemp.length <= 0) {
      console.log('Нет доступного хода для этой фигуры!')
      // return
    }
    const moves = [...movesTemp, square] // Добавляем клетку, с которой взяли фигуру, для ее подсветки

    console.log('Взята: ', grabFigure, ' Доступные ходы: ', moves)

    // Массив с доступными ходами в виде индексов [cell: {0, 5}, id, cell: {...}, square...] -  координаты клетки в массиве доски
    const moveIndices = moves.map(square => ({ cell: squareToIndices(square), square }))
    setPossibleMoves([...moveIndices])

    // console.log(moveIndices)

    setGrabCell({ col, row, square: grabFigure.square })
    setHighlightedCell({
      cell: {
        col,
        row,
      },
      visible: true,
      color: COLORS.accessibleСell
    })
    setIsDragging(true)
  }, [
    appStore,
    setLastMoveCells,
    lastMoveCells,
    setPosition,
    setPossibleMoves,
    setCellInCheck,
    setGrabCell,
    setHighlightedCell,
    setIsDragging,
    getCellPosition,
    getSquare,
    squareToIndices
  ])



  const handlePointerMove = (e) => {
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
      // Подсвечиваем красным, если ход сюда не доступен   
      const condition = possibleMoves.filter(m => m.square === square).length === 0 // true, если ход не доступен в клетку square
      if (condition) {
        setHighlightedCell(prev => {
          if (prev.cell.col === col && prev.cell.row === row) return prev
          return {
            ...prev,
            cell: { col, row },
            color: COLORS.errorCell
          }
        })
        return
      }

      setHighlightedCell(prev => {
        if (prev.cell.col === col && prev.cell.row === row) return prev
        return {
          ...prev,
          cell: { col, row },
          color: COLORS.accessibleСell
        }
      })

    } else {

      setHighlightedCell(prev => {
        if (prev.cell.col === grabCell.col && prev.cell.row === grabCell.row) return prev
        return {
          ...prev,
          cell: { col: grabCell.col, row: grabCell.row },
          color: COLORS.accessibleСell
        }
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


      setLastMoveCells([{
        cell: {
          col: grabCell.col,
          row: grabCell.row
        },
        id: 1
      }])
      return
    }
    const condition = possibleMoves.filter(m => m.square === square).length === 0 // true, если ход не доступен в клетку square
    if (col < 0 || col > 7 || row < 0 || row > 7 || condition || grabCell.square === square) {
      console.log('Фигура вне доски или недопустимый ход')
      return
    }



    // Успешный ход------------------------------------------------------
    setLastMoveCells([])
    setPossibleMoves([])


    setLastMoveCells([{
      cell: {
        col: grabCell.col,
        row: grabCell.row
      },
      id: 1
    },
    {
      cell: {
        col: col,
        row: row
      },
      id: 2
    }])



    let capturedFigure = appStore.chess.board()[row][col] // Съеденная фигура
    const move = appStore.chess.move(`${grabCell.square}${square}`) // Сделать ход

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



    appStore.updateHistoryMoves(`${grabCell.square}${square}`)
    appStore.updateHistoryList()
    getGameStatus()


    if (appStore.chess.inCheck() || appStore.chess.isCheckmate()) {
      const player = appStore.chess.turn() // чей сейчас ход
      const squareArr = appStore.chess.findPiece({ type: 'k', color: player }) // ищем клетку на котором король

      if (squareArr.length !== 1) return
      const cellIndices = squareToIndices(squareArr[0])
      console.log('король на: ', cellIndices)
      setCellInCheck({ cell: { ...cellIndices }, color: COLORS.errorCell, visible: true })
    }

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
    setCellInCheck({
      col: 0,
      row: 0,
      visible: false
    })
    // setPossibleMoves([])
    // setLastMoveCells([])
  }

  return {
    isDragging,
    position,
    highlightedCell,
    lastMoveCells,
    possibleMoves,
    cellInCheck,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  }
}
