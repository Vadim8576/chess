import { memo, useEffect, useState } from "react"
import { useLoadImage } from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import appStore from "../../store/appStore";
import { useFigureDrag } from "../../hooks/useFigureDrag";


const ImgWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
  cursor: ${props => props.$cursor};
  user-select: none;
  touch-action: none;
  z-index: ${props => props.$zIndex};
  transition: ${props => props.$transition};
  // transform: ${props => props.translate};
`;


const Img = styled.img`
  width: 75%;
  height: 75%;
  pointer-events: none;
	// cursor: ${props => props.$cursor};
	user-select: none;
  touch-action: none;
`;

const Figure = observer(({
	src,
	top,
	left,
	id,
	position
}) => {

	const [activeFigureId, setActiveFigureId] = useState(null);
	const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })

	const [imgStyle, setImgStyle] = useState({ zIndex: 100, transition: 'none' })

	const { isLoading, isError, image } = useLoadImage(src)

	const cellSize = appStore.board.cellSize


	// useEffect(() => {
	// 	const x = left - position.x;
	// 	const y = top - position.y;
	// 	setCurrentPosition(x, y)
	// 	console.log(position)
	// }, [position])





	if (isLoading) {
		return
	}

	if (isError) {
		return
	}

	if (!src) return

	const handleFigureMouseDown = (id) => {
		setActiveFigureId(id)
		console.log(id)
	}


	return (
		<ImgWrapper
			$cursor={activeFigureId === id ? 'grabbing' : 'grab'}
			$width={cellSize}
			$height={cellSize}
			$zIndex={imgStyle.zIndex}
			$transition={imgStyle.transition}
			$top={(activeFigureId === id && position) ? position.y : top}
			$left={(activeFigureId === id && position) ? position.x : left}
			onMouseDown={() => handleFigureMouseDown(id)}
			onMouseUp={() => setActiveFigureId(null)}
			// onMouseLeave={() => setActiveFigureId(null)}

		// style={{
		// 	left: (activeFigureId === figureId && position) ? `${position.x}px`,
		// 	top: `${position.y}px`
		// }}

		// translate={`translate(${currentPosition.x}, ${currentPosition.y})`}
		>
			<Img
				src={image.src}
			/>
		</ImgWrapper>
	)
})


export default Figure