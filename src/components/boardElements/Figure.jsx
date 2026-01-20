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
`;

const Img = styled.img`
    width: 75%;
    height: 75%;
    pointer-events: none;
`;

const Figure = observer(({
	src,
	top,
	left,
	isDragging
}) => {
	const [imgStyle, setImgStyle] = useState({ zIndex: 100, transition: 'none' })

	const { isLoading, isError, image } = useLoadImage(src)
	
	const cellSize = appStore.board.cellSize


	if (isLoading) {
		return
	}

	if (isError) {
		return
	}

	if (!src) return

	return (
		<ImgWrapper
			draggable={false}
			$cursor={isDragging ? 'grabbing' : 'grab'}
			$width={cellSize}
			$height={cellSize}
			$zIndex={imgStyle.zIndex}
			$transition={imgStyle.transition}
			$top={top}
			$left={left}
		>
			<Img src={image.src} />
		</ImgWrapper>
	)
})


export default Figure