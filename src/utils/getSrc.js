import { figure } from "../constants/boardInitial";


export const getSrc = (currentPlayer, board, x, y) => figure[board[currentPlayer === 'white' ? y : (7 - y)][currentPlayer === 'white' ? x : (7 - x)]]