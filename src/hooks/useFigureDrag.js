import { useState, useRef } from 'react'
import getCellPosition from '../utils/getCellPosition'

export function useFigureDrag(appStore, cellSize, startX, startY, setHighlightedCell) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentFigure, setCurrentFigure] = useState(null)
  const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)


  const handleMouseDown = (e) => {
    if (e.button !== 0) return // Только левая кнопка мыши
    setIsDragging(true)
    e.preventDefault();

    imageRef.current.style.zIndex = '101'
    imageRef.current.style.transition = 'none'

    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, cellSize, appStore.currentPlayer)

    setCurrentFigure(appStore.board[row][col])
    setGrabCell({ col, row })
    setHighlightedCell({
      col,
      row,
      visible: true
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - startX
    const y = e.clientY - startY
    const xc = x - rect.width / 2
    const yc = y - rect.height / 2
    const [col, row] = getCellPosition(x, y, cellSize, appStore.currentPlayer)

    setPosition({ x: xc, y: yc })

    if (col >= 0 && col <= 7 && row >= 0 && row <= 7) {
      setHighlightedCell({
        col,
        row,
        visible: true
      });
    } else {
      // Если вышли за пределы доски, сохраняем подсветку исходной клетки
      setHighlightedCell({
        col: grabCell.col,
        row: grabCell.row,
        visible: true
      });
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false)
    imageRef.current.style.zIndex = '100'
    imageRef.current.style.transition = '.3s'

    const x = e.clientX - startX
    const y = e.clientY - startY
    const [col, row] = getCellPosition(x, y, cellSize, appStore.currentPlayer)

    console.log('Отпустили на:', row, col)

    if (col < 0 || col > 7 || row < 0 || row > 7) {
      console.log('Фигура вне доски')
      // Возвращаем фигуру на исходную клетку
      const colTemp = grabCell.col;
      const rowTemp = grabCell.row;
      const finalCol = appStore.currentPlayer === 'white' ? colTemp : (7 - colTemp)
      const finalRow = appStore.currentPlayer === 'white' ? rowTemp : (7 - rowTemp)

      setPosition({
        x: finalCol * cellSize,
        y: finalRow * cellSize
      })

      setHighlightedCell((prev) => ({
        ...prev,
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
    setHighlightedCell((prev) => ({
      ...prev,
      visible: false
    }))

    appStore.boardUpdate(currentFigure, grabCell, row, col);
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
