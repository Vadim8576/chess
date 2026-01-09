import { useEffect, useState } from "react";
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";

const Cell = styled.div`
position: absolute;
background-color: ${props => props.color};
opacity: .5;
z-index: 99;
width: ${props => props.$cellSize}px;
height: ${props => props.$cellSize}px;
border: none;
`;


const HighlightedCell = observer(({ cellSize, highlightedCell }) => {

    const color = highlightedCell.color ? highlightedCell.color : '#999'
    const colTemp = highlightedCell.col
    const rowTemp = highlightedCell.row
    const col = appStore.currentPlayer === 'white' ? colTemp : (7 - colTemp)
    const row = appStore.currentPlayer === 'white' ? rowTemp : (7 - rowTemp)

    if (!highlightedCell.visible) return

    return (
        <Cell
            style={{
                top: row * cellSize,
                left: col * cellSize
            }}
            $cellSize={cellSize}
            color={color}
        />
    )
})

export default HighlightedCell