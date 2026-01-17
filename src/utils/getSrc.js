import { figure } from "../constants/gameInitial";


export const getSrc = (whiteBottom, board, x, y) => {
    const square = board[whiteBottom ? y : (7 - y)][whiteBottom ? x : (7 - x)]
    if(!square) return undefined
    return figure[`${square.type}${square.color}`]
}