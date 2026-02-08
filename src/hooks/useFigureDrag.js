import { useCallback, useState } from 'react'
import { getCellPosition } from '../utils/getCellPosition'
import { getSquare } from '../utils/getSquare'
import { squareToIndices } from '../utils/squareToIndices'
import { COLORS } from '../constants/gameInitial'
import { gameStatus } from '../utils/gameStatus'
import { getPossibleMoves } from '../utils/getPossibleMoves'
import gameStore from '../store/gameStore'



export const useFigureDrag = (
  AppStore,
  setDraggedFigure,
  setIsMoving
) => {

  const [isDragging, setIsDragging] = useState(false)
  const [grabCell, setGrabCell] = useState(null)
  const [position, setPosition] = useState(null)
  const [highlightedCell, setHighlightedCell] = useState({})

  const handlePointerDown = useCallback((e, currentFigureSquare) => {

    console.log(AppStore.gameStatus)

    if (AppStore.gameStatus === 'finished') return

    const startX = AppStore.board.x
    const startY = AppStore.board.y
    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, AppStore)
    const grabFigure = AppStore.chess.board()[row][col]

    AppStore.setPromotion(null)

    if (!grabFigure) return



    // console.log('!!!!!', 'физически ', currentFigureSquare, 'по расчету ', grabFigure.square)

    const isCurrentPlayer = grabFigure.color === AppStore.chess.turn()

    if (currentFigureSquare !== grabFigure.square) {
      console.log('Взял одну фигуру, а по расчетам другая')
      setDraggedFigure(null)
      return
    }

    if (isCurrentPlayer) {
      AppStore.setLastMoveCells([])
      console.log('Взял другую свою фигуру')
    }


    // const attack = AppStore.chess.attackers(grabFigure.square)
    // console.log(`Атака `, attack)


    // if (AppStore.possibleMoves.length > 0) {
    //   AppStore.setPossibleMoves([])
    //   return
    // } else {
    const pm = getPossibleMoves(AppStore, grabFigure.square)
    // console.log(pm)
    AppStore.setPossibleMoves([...pm])
    // }

    setGrabCell({ col, row })

    AppStore.setLastMoveCells([{
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
    AppStore,
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
  // type - doubleClick, если фигура перемещается сначало выбором фигуры, потом клетки, куда ее поставить

  const fugureMove = useCallback((startCell, finishCell, type) => {

    // console.log(startCell, finishCell)

    const col = finishCell.col
    const row = finishCell.row
    const startSquare = getSquare(AppStore.whiteBottom, startCell.col, startCell.row)
    const finishSquare = getSquare(AppStore.whiteBottom, col, row) // square - конечной клетки

    if (startSquare === finishSquare) {
      console.log('Поставил туда же, где взял!')
      return
    }

    if (type === 'drop') {
      const condition = AppStore.possibleMoves.filter((m, i) => m.id === `${finishSquare}_${i}`).length === 0 // true, если ход не доступен в клетку square
      if (col < 0 || col > 7 || row < 0 || row > 7 || condition) {
        console.log('Фигура вне доски или недопустимый ход')
        AppStore.setPossibleMoves([])
        AppStore.setLastMoveCells([])
        return
      }
    }


    // Успешный ход------------------------------------------------------
    AppStore.setLastMoveCells([
      { cell: { col: startCell.col, row: startCell.row } },
      { cell: { col: col, row: row } }
    ])

    AppStore.setPossibleMoves([])

    const moveSquares = `${startSquare}${finishSquare}`
    let capturedFigure = AppStore.chess.board()[row][col] // фигура на клетке


    console.log(capturedFigure)




    AppStore.checkingMove(capturedFigure, { startSquare, finishSquare }) // Сделать ход

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

  }, [AppStore, grabCell])





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
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  }
}
