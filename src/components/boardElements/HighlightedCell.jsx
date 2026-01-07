import { useEffect, useState } from "react";
import styled from "styled-components";

const Cell = styled.div`
position: absolute;
background: green;
opacity: .5;
z-index: 99;
width: ${props => props.$cellSize}px;
height: ${props => props.$cellSize}px;
`;


const HighlightedCell = ({ cellSize, highlightedCell }) => {

    // console.log('HighlightedCell')

    const col = highlightedCell.col
    const row = highlightedCell.row

    if (!highlightedCell.visible) return

    return (
        <Cell
            style={{
                top: row * cellSize,
                left: col * cellSize
            }}
            $cellSize={cellSize}
        />
    );
};

export default HighlightedCell