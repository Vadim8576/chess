import { useState } from 'react';

const useHighlightedCell = () => {
  const [cell, setCell] = useState({
    col: null,
    row: null,
    visible: false
  });

  const updateCell = (newCol, newRow) => {
    if (cell.col !== newCol || cell.row !== newRow) {
      setCell({
        col: newCol,
        row: newRow,
        visible: true
      });
    }
  };

  return [cell, updateCell];
}
export default useHighlightedCell