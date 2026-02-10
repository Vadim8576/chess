import { useMemo } from "react"


export const useCapturedFiguresFilter = (capturedFigures, player) => useMemo(() => {
  if (!capturedFigures || capturedFigures.length === 0) return null
  return capturedFigures.filter(capturedFigure => capturedFigure[capturedFigure.length - 1] === player)
}, [capturedFigures, player])
