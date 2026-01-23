import { memo, useEffect, useState } from "react"
import { useLoadImage } from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import appStore from "../../store/appStore";
import { getCellPosition } from "../../utils/getCellPosition";
import { getSquare } from "../../utils/getSquare";


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
`;

const Img = styled.img`
  width: 75%;
  height: 75%;
  pointer-events: none;
	user-select: none;
  touch-action: none;
`;

const Figure = observer(({
	src,
	top,
	left,
	id,
	setActiveFigure,
	activeFigure,
	imgStyle
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

	const handleFigureMouseDown = (id) => {
		const [col, row] = getCellPosition(left, top, appStore)
		const square = getSquare(appStore.whiteBottom, col, row)
		setActiveFigure({id, square})

		console.log(id, square)
	}


	return (
		<ImgWrapper
			$cursor={activeFigure === id ? 'grabbing' : 'grab'}
			$width={cellSize}
			$height={cellSize}
			$zIndex={activeFigure === id ? imgStyle.zIndex : 100}
			// $transition={imgStyle.transition}
			$top={top}
			$left={left}
			onMouseDown={() => handleFigureMouseDown(id)}
			// onMouseUp={() => setActiveFigure({square: null, id: null})}
		>
			<Img
				src={image.src}
			/>
		</ImgWrapper>
	)
})


export default Figure