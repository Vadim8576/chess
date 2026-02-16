import { useEffect, useMemo, useState } from "react"
import { COLORS } from "../constants/gameInitial"
import { getSquare } from "../utils/getSquare"
import AppStore from "../store/AppStore"


export const useGamePadCursor = (isButtonPressed, isConnected, grabCell, fugureMove, firstPress) => {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [gamePadCursor, setGamePadCursor] = useState({
    cell: { col: 4, row: 4 },
    color: COLORS.primary,
    visible: false
  })

  // let x = 0
  // let y = 0



  useEffect(() => {
    if (isButtonPressed(15)) {
      // x++
      setX(prevX => prevX < 7 ? prevX + 1 : 0)
      // setGamePadCursor(prev => ({
      //   ...prev,
      //   cell: { col: prev.cell.col + 1, row: prev.cell.row },
      //   visible: true
      // }))
    }
    // { cell: { col: x, row: y }, color: COLORS.primary, visible: true }

    if (isButtonPressed(14)) {
      // x--
      setX(prevX => prevX > 0 ? prevX - 1 : 7)
      // setGamePadCursor(prev => ({
      //   ...prev,
      //   cell: { col: prev.cell.col - 1, row: prev.cell.row },
      //   visible: true
      // }))
    }

    if (isButtonPressed(12)) {
      // y--
      setY(prevY => prevY > 0 ? prevY - 1 : 7)
      // setGamePadCursor(prev => ({
      //   ...prev,
      //   cell: { col: prev.cell.col, row: prev.cell.row - 1 },
      //   visible: true
      // }))
    }

    if (isButtonPressed(13)) {
      // y++
      setY(prevY => prevY < 7 ? prevY + 1 : 0)
      // setGamePadCursor(prev => ({
      //   ...prev,
      //   cell: { col: prev.cell.col, row: prev.cell.row + 1 },
      //   visible: true
      // }))
    }


    const square = getSquare(AppStore.whiteBottom, x, y)
    const condition = AppStore.possibleMoves.filter((m, i) => m.id === `${square}_${i}`).length === 0 // true, если ход не доступен в клетку square


    if (isButtonPressed(0)) {

      if (grabCell === null) {
        console.log('Первое нажатие')
        const square = getSquare(AppStore.whiteBottom, gamePadCursor.cell.col, gamePadCursor.cell.row)
        firstPress(gamePadCursor.cell.row, gamePadCursor.cell.col, square)
      } else {


        console.log(condition)

        // if(condition) {
        //   console.log('Недопустимое второе нажатие')
        //   return
        // }
        console.log('Второе нажатие')
        // На второе нажатие:
        const startCell = { ...grabCell }
        const finishCell = { ...gamePadCursor.cell }
        console.log(startCell, finishCell)
        fugureMove(startCell, finishCell, 'secondClick')
        // setGamePadCursor(prev => ({
        //   ...prev,
        //   visible: false
        // }))
      }

    }


    const color = !condition ? COLORS.secondary : COLORS.errorCell

    setGamePadCursor(prev => ({
      ...prev,
      cell: { col: x, row: y },
      color,
      visible: isConnected
    }))

    console.log('gamePadCursor')

  }, [isButtonPressed])









  const values = {
    gamePadCursor
  }


  return useMemo(() => values, [values])

}