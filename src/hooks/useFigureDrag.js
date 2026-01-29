import { useCallback, useState } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'
import { COLORS } from '../constants/gameInitial'
import { gameStatus } from '../utils/gameStatus'
import { getPossibleMoves } from '../utils/getPossibleMoves'



export const useFigureDrag = (
  appStore,
  setDraggedFigure,
  setIsMoving
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState(null)
  const [position, setPosition] = useState(null)
  const [highlightedCell, setHighlightedCell] = useState({})

  const handlePointerDown = useCallback((e, currentFigureSquare) => {
    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, appStore)
    const grabFigure = appStore.chess.board()[row][col]

    if (!grabFigure) return

    console.log('!!!!!', 'физически ', currentFigureSquare, 'по расчету ', grabFigure.square)

    const isCurrentPlayer = grabFigure.color === appStore.chess.turn()

    if (currentFigureSquare !== grabFigure.square) {
      console.log('Взял одну фигуру, а по расчетам другая')
      setDraggedFigure(null)
      return
    }

    if (isCurrentPlayer) {
      appStore.setLastMoveCells([])
      console.log('Взял другую свою фигуру')
    }


    // const attack = appStore.chess.attackers(grabFigure.square)
    // console.log(`Атака `, attack)


    // if (appStore.possibleMoves.length > 0) {
    //   appStore.setPossibleMoves([])
    //   return
    // } else {
    const pm = getPossibleMoves(appStore, grabFigure.square)
    appStore.setPossibleMoves([...pm])
    // }

    setGrabCell({ col, row })

    appStore.setLastMoveCells([{
      cell: {
        col: col,
        row: row
      }
    }])

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
    setGrabCell,
    setHighlightedCell,
    setIsDragging,
    setDraggedFigure
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

    setPosition({ x: xc, y: yc })

    setIsMoving(prev => {
      if (prev !== false) return prev
      return true
    })


    const condition = appStore.possibleMoves.filter(m => m.id === square).length === 0 // true, если ход не доступен в клетку square
    const visible = (col >= 0 && col <= 7 && row >= 0 && row <= 7) ? true : false
    const color = !condition ? COLORS.accessibleСell : COLORS.errorCell
    setHighlightedCell(prev => {
      if (prev.cell.col === col && prev.cell.row === row) return prev
      return {
        ...prev,
        cell: { col, row },
        color,
        visible
      }
    })
  }



  const handlePointerUp = (e) => {
    resetMove()
    setIsMoving(false)

    const startX = appStore.board.x
    const startY = appStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, appStore)
    const square = getSquare(appStore.whiteBottom, col, row) // Получаем адрес текущей клетки из координат, например, A7
    // console.log('Отпущено на:', square)
    const startCell = { ...grabCell }
    const finishCell = { col, row }
    fugureMove(startCell, finishCell, 'drop')
  }



  const handlePointerCancel = () => {
    resetMove()
    appStore.setPossibleMoves([])
    appStore.setLastMoveCells([])
  }





  // type - drop, если фигура поставлена перетаскиванием
  // type - doubleClick, если фигура перемещается сначало выбором фигуры, потом клетки, куда ее поставить

  const fugureMove = useCallback((startCell, finishCell, type) => {

    console.log(startCell, finishCell)

    const col = finishCell.col
    const row = finishCell.row
    const startSquare = getSquare(appStore.whiteBottom, startCell.col, startCell.row)
    const finishSquare = getSquare(appStore.whiteBottom, col, row) // square - конечной клетки

    if (startSquare === finishSquare) {
      console.log('Поставил туда же, где взял!')
      return
    }

    if (type === 'drop') {
      const condition = appStore.possibleMoves.filter(m => m.id === finishSquare).length === 0 // true, если ход не доступен в клетку square
      if (col < 0 || col > 7 || row < 0 || row > 7 || condition) {
        console.log('Фигура вне доски или недопустимый ход')
        appStore.setPossibleMoves([])
        appStore.setLastMoveCells([])
        return
      }
    }


    // Успешный ход------------------------------------------------------
    appStore.setLastMoveCells([
      { cell: { col: startCell.col, row: startCell.row } },
      { cell: { col: col, row: row } }
    ])

    appStore.setPossibleMoves([])

    const moveSquares = `${startSquare}${finishSquare}`
    let capturedFigure = appStore.chess.board()[row][col] // фигура на клетке
    const move = appStore.chess.move(moveSquares) // Сделать ход

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

    // appStore.updateHistoryMoves(moveSquares)
    // appStore.updateHistoryList()

    gameStatus(appStore)

    updateKingCheckHighlight()

    appStore.saveGameToLocalStorage()

  }, [appStore, grabCell])


  function updateKingCheckHighlight() {
    if (appStore.chess.inCheck() || appStore.chess.isCheckmate()) {
      const player = appStore.chess.turn() // чей сейчас ход
      const squareArr = appStore.chess.findPiece({ type: 'k', color: player }) // ищем клетку на котором король

      if (squareArr.length !== 1) return
      const cellIndices = squareToIndices(squareArr[0])
      console.log('король на: ', cellIndices)
      appStore.setCellInCheck({ cell: { ...cellIndices }, color: COLORS.errorCell, visible: true })
    } else {
      appStore.setCellInCheck(state => ({ ...state, visible: false }))
    }
  }



  function resetMove() {
    setIsDragging(false)
    setDraggedFigure(null)
    setHighlightedCell((state) => ({
      ...state,
      visible: false
    }))
    setPosition(null)
  }


  return {
    isDragging,
    position,
    grabCell,
    highlightedCell,
    fugureMove,
    updateKingCheckHighlight,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  }
}
