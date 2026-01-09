import { figure } from "../constants/boardInitial";


export const getSrc = (currentPlayer, board, x, y) => {
    const square = board[currentPlayer === 'white' ? y : (7 - y)][currentPlayer === 'white' ? x : (7 - x)]
    if(!square) return undefined
    return figure[square.type + square.color]
}