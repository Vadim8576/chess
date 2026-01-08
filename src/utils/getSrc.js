import { boardMap, figure } from "../constants/boardInitial";
import appStore from "../store/appStore";


export const getSrc = (currentPlayer, x, y) => figure[boardMap[currentPlayer === 'white' ? y : (7 - y)][currentPlayer === 'white' ? x : (7 - x)]]