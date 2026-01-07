import { board, figure } from "../constants/boardInitial";

export const getSrc = (currentPlayer, x, y) => figure[board[currentPlayer === 'white' ? y : (7 - y)][currentPlayer === 'white' ? x : (7 - x)]]