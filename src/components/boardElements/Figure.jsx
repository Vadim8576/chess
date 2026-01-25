import { useLoadImage } from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";
import { getCellPosition } from "../../utils/getCellPosition";
import { getSquare } from "../../utils/getSquare";
import { memo, useEffect } from "react";


const ImgWrapper = styled.div.attrs(props => ({
	style: {
		top: `${props.$top}px`,
		left: `${props.$left}px`,
		width: `${props.$width}px`,
		height: `${props.$height}px`,
		cursor: props.$cursor,
		zIndex: props.$zIndex,
	},
}))`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
	-webkit-user-drag: none;
	user-select: none;
  touch-action: none;
`;

const Img = styled.img`
  width: 75%;
  height: 75%;
  pointer-events: none;
	-webkit-user-drag: none;
	user-select: none;
  touch-action: none;
	// border: 1px blue solid;
`;

const Figure = memo(observer(({
	src,
	top,
	left,
	id,
	handlePointerDown,
	setDraggedFigure
}) => {


	const { isLoading, isError, image } = useLoadImage(src)
	const cellSize = appStore.board.cellSize


	if (isLoading) {
		return
	}

	if (isError) {
		return
	}

	if (!src) return



	const onPointerDown = (e) => {
		e.preventDefault()
		if (e.button !== 0 && e.pointerType !== 'touch') return
		if (appStore.chess.isGameOver()) return
		setDraggedFigure({ image, id })
		const [col, row] = getCellPosition(left, top, appStore)
		const square = getSquare(appStore.whiteBottom, col, row)
		handlePointerDown(e, square)
	}




	return (
		<ImgWrapper
			onPointerDown={onPointerDown}
			$cursor={'grab'}
			$width={cellSize}
			$height={cellSize}
			$top={top}
			$left={left}
		>
			<Img src={image.src} />
		</ImgWrapper>
	)
}))

export default Figure