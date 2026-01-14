import { useEffect, useState } from "react";
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";

const Cell = styled.div`
position: absolute;
background-color: ${props => props.color};
opacity: .5;
z-index: 99;
width: ${props => props.$cellSize - 2}px;
height: ${props => props.$cellSize - 2}px;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
border: none;
`;


const HighlightedCell = observer(({ highlightedCell }) => {

    // const color = highlightedCell.color ? highlightedCell.color : '#999'
    const colTemp = highlightedCell.col
    const rowTemp = highlightedCell.row
    const col = appStore.whiteBottom ? colTemp : (7 - colTemp)
    const row = appStore.whiteBottom ? rowTemp : (7 - rowTemp)

    if (!highlightedCell.visible) return

    return (
        <Cell
            $top={row * appStore.board.cellSize + 1}
            $left={col * appStore.board.cellSize + 1}
            $cellSize={appStore.board.cellSize}
            color={highlightedCell.color}
        />
    )
})

export default HighlightedCell