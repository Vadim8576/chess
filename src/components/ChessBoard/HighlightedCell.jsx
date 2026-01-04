import styled from "styled-components";

const Cell = styled.div`
position: absolute;
background: red;
opacity: .5;
z-index: 99;
width: ${props => props.$cellSize}px;
height: ${props => props.$cellSize}px;
`;


const HighlightedCell = ({ cellSize, highlightedCell }) => {

    const col = highlightedCell.col
    const row = highlightedCell.row

    if(!highlightedCell.visible) return
    // if (col < 0 || col > 7 || row < 0 || row > 7) return

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