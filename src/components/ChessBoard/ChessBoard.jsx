import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardElements from '../boardElements/BoardElements';
import { observer } from 'mobx-react-lite';
import BoardCanvas from './BoardCanvas';
import appStore from '../../store/appStore';
import BorderCanvas from './BorderCanvas';
import Board from './Board';



const Cell = styled.div`
position: absolute;
background-color: red;
width: 50px;
height: 50px;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
border: none;
`;

const BoardWrapper = styled.div`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  
`;


const ChessBoard = observer(() => {
  console.log('ChessBoard Render')


  return (
    <BoardWrapper
      $size={appStore.board.cellSize * 8}
    >
      {/* <BoardCanvas /> */}
      <Board />
      <BoardElements />
    </BoardWrapper>
  )
})

export default ChessBoard