import { useCallback, useState } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { COLORS } from '../constants/gameInitial'
import { getPossibleMoves } from '../utils/getPossibleMoves'



export const useFigureDrag = (
  AppStore,
  setDraggedFigure,
  setIsMoving,
  setGamePadCursor
) => {

  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState(null)
  const [position, setPosition] = useState(null)
  const [highlightedCell, setHighlightedCell] = useState({})
  

  const handlePointerDown = useCallback((e, currentFigureSquare) => {

    setGamePadCursor(prev => ({
      ...prev,
      visible: prev.visible === true ? false : prev.visible
    }))

    console.log(AppStore.gameStatus)

    if (AppStore.gameStatus === 'finished') return

    const startX = AppStore.board.x
    const startY = AppStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, AppStore)

    firstPress(row, col, currentFigureSquare)


    // const grabFigure = AppStore.chess.board()[row][col]

    // AppStore.setPromotion(null)

    // if (!grabFigure) return

    // const isCurrentPlayer = grabFigure.color === AppStore.chess.turn()

    // if (currentFigureSquare !== grabFigure.square) {
    //   console.log('Взял одну фигуру, а по расчетам другая')
    //   setDraggedFigure(null)
    //   return
    // }

    // if (isCurrentPlayer) {
    //   AppStore.setLastMoveCells([])
    //   console.log('Взял другую свою фигуру')
    // }

    // const pm = getPossibleMoves(AppStore, grabFigure.square)
    // AppStore.setPossibleMoves([...pm])

    // setGrabCell({ col, row })

    // AppStore.setLastMoveCells([
    //   {
    //     col: col,
    //     row: row
    //   }
    // ])

    // setHighlightedCell({
    //   cell: {
    //     col,
    //     row,
    //   },
    //   visible: true,
    //   color: COLORS.accessibleСell
    // })
    // setIsDragging(true)
  }, [AppStore])







  const firstPress = useCallback((row, col, currentFigureSquare) => {

    AppStore.setPromotion(null)
    setGrabCell(null)

    const grabFigure = AppStore.chess.board()[row][col]
    if (!grabFigure) return

    const isCurrentPlayer = grabFigure.color === AppStore.chess.turn()

    if (currentFigureSquare !== grabFigure.square) {
      console.log('Взял одну фигуру, а по расчетам другая')
      setDraggedFigure(null)
      return
    }

    if (isCurrentPlayer) {
      AppStore.setLastMoveCells([])
      console.log('Взял другую свою фигуру')
    } else {
      console.log('Чужая фигура')

      return
    }

    const pm = getPossibleMoves(AppStore, grabFigure.square)

    console.log(pm)

    if(pm.length < 2) {
      AppStore.setPossibleMoves([])
      return
    }

    AppStore.setPossibleMoves(pm)

    setGrabCell({ col, row })

    AppStore.setLastMoveCells([
      {
        col: col,
        row: row
      }
    ])

    setHighlightedCell({
      cell: {
        col,
        row,
      },
      visible: false,
      color: COLORS.accessibleСell
    })
    setIsDragging(true)
  }, [
    setGrabCell,
    setHighlightedCell,
    setIsDragging,
    setDraggedFigure
  ])







  const handlePointerMove = (e) => {

    if (!isDragging) return
    const startX = AppStore.board.x
    const startY = AppStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - AppStore.board.cellSize / 2
    const yc = y - AppStore.board.cellSize / 2
    const [col, row] = getCellPosition(x, y, AppStore)
    const square = getSquare(AppStore.whiteBottom, col, row)

    setPosition({ x: xc, y: yc })

    setIsMoving(prev => {
      if (prev !== false) return prev
      return true
    })


    const condition = AppStore.possibleMoves.filter((m, i) => m.id === `${square}_${i}`).length === 0 // true, если ход не доступен в клетку square
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

    const startX = AppStore.board.x
    const startY = AppStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, AppStore)
    const square = getSquare(AppStore.whiteBottom, col, row) // Получаем адрес текущей клетки из координат, например, A7
    // console.log('Отпущено на:', square)
    const startCell = { ...grabCell }
    const finishCell = { col, row }
    fugureMove(startCell, finishCell, 'drop')
  }



  const handlePointerCancel = () => {
    resetMove()
    AppStore.setPossibleMoves([])
    AppStore.setLastMoveCells([])
  }





  // type - drop, если фигура поставлена перетаскиванием
  // type - secondClick, если фигура перемещается сначало выбором фигуры, потом клетки, куда ее поставить

  const fugureMove = useCallback((startCell, finishCell, type) => {

    // console.log(startCell, finishCell)
    console.log(type)



    const col = finishCell.col
    const row = finishCell.row
    const startSquare = getSquare(AppStore.whiteBottom, startCell.col, startCell.row)
    const finishSquare = getSquare(AppStore.whiteBottom, col, row) // square - конечной клетки

    if (startSquare === finishSquare) {
      console.log('Поставил туда же, где взял!')
      // setGrabCell(null)
      // AppStore.setLastMoveCells([])
      // AppStore.setPossibleMoves([])
      return
    }

    const condition = AppStore.possibleMoves.filter((m, i) => m.id === `${finishSquare}_${i}`).length === 0 // true, если ход не доступен в клетку square

    if (type === 'drop') {
      if (col < 0 || col > 7 || row < 0 || row > 7) {
        console.log('Фигура вне доски')
        // AppStore.setPossibleMoves([])
        // AppStore.setLastMoveCells([])
        // setGrabCell(null)
        resetMove()
        return
      }

      if (condition) {
        console.log('Недопустимый ход')
        // AppStore.setPossibleMoves([])
        // AppStore.setLastMoveCells([])
        // setGrabCell(null)
        resetMove()
        return
      }

    } else if (type === 'secondClick' && condition) {
      console.log('Недопустимый ход secondClick')
      AppStore.setPossibleMoves([])
      AppStore.setLastMoveCells([])
      resetMove()
      setGrabCell(null)
      return
    }




    // Успешный ход------------------------------------------------------

    // AppStore.setLastMoveCells([
    //   { cell: { col: startCell.col, row: startCell.row } },
    //   { cell: { col: col, row: row } }
    // ])

    AppStore.setLastMoveCells([
      { col: startCell.col, row: startCell.row },
      { col: col, row: row }
    ])

    AppStore.setPossibleMoves([])


    // const moveSquares = `${startSquare}${finishSquare}`
    let capturedFigure = AppStore.chess.board()[row][col] // фигура на клетке


    console.log('capturedFigure = ', capturedFigure)



    setHighlightedCell(prev => ({
      ...prev,
      visible: false
    }))


    AppStore.checkingMove(capturedFigure, { startSquare, finishSquare }) // Сделать ход

    setGrabCell(null)

    // // если присутствует flags 'e', произошло взятие на проходе
    // if (move && move.flags.includes('e')) {
    //   console.log('Взятие на проходе!')
    //   capturedFigure = {
    //     type: 'p',
    //     color: move.color === 'w' ? 'b' : 'w'
    //   }
    // }



    // // AppStore.updateHistoryMoves(moveSquares)
    // // AppStore.updateHistoryList()

    // gameStatus(AppStore)

    // AppStore.updateKingCheckHighlight()

    // if (AppStore.gameType === 'local') {
    //   AppStore.saveGameToLocalStorage()
    //   if (capturedFigure != null || capturedFigure != undefined) {
    //     AppStore.addCapturedFigures(capturedFigure.color, `${capturedFigure.type}${capturedFigure.color}`)
    //   }
    //   return
    // }

    // gameStore.updateBoard() // обновить доску в Firebase

  }, [AppStore, setGrabCell, resetMove, setHighlightedCell])





  function resetMove() {
    setIsDragging(false)
    setDraggedFigure(null)
    setHighlightedCell((state) => ({
      ...state,
      visible: false
    }))
    setPosition(null)
    // setGrabCell(null)
  }


  return {
    isDragging,
    position,
    grabCell,
    highlightedCell,
    fugureMove,
    firstPress,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  }
}
