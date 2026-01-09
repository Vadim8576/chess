import { useEffect, useState } from "react"
import useLoadImage from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import appStore from "../../store/appStore";
import { useFigureDrag } from "../../hooks/useFigureDrag";


const ImgWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.$width}px;
    height: ${props => props.$height}px;
    cursor: ${props => props.$cursor};
    user-select: none;
    touch-action: none;
    z-index: ${props => props.$zIndex};
    transition: ${props => props.$transition};
`;

const Img = styled.img`
    width: 80%;
    height: 80%;
    pointer-events: none;
`;

const Figure = observer(({ src, top, left, startX, startY, cellSize, setHighlightedCell, setPossibleMoves }) => {
    const [imgStyle, setImgStyle] = useState({zIndex: 100, transition: 'none'})
    const { isLoading, isError, image } = useLoadImage(src)

    const {
        isDragging,
        position,
        imageRef,
        setPosition,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
      } = useFigureDrag(appStore, cellSize, startX, startY, setHighlightedCell, setPossibleMoves, setImgStyle)


    useEffect(() => {
        setPosition({ x: left, y: top })
    }, [left, top])


    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])


    if (isLoading) {
        return <div>.</div>
    }

    if (isError) {
        return <div>!</div>
    }

    if (!src) return

    return (
        <ImgWrapper
            ref={imageRef}
            onMouseDown={handleMouseDown}
            draggable={false}
            $cursor={isDragging ? 'grabbing' : 'grab'}
            $width={cellSize}
            $height={cellSize}
            $zIndex={imgStyle.zIndex}
            $transition={imgStyle.transition}
            style={{
                top: position.y,
                left: position.x
            }}
        >
            <Img src={image.src} />
        </ImgWrapper>
    )
})

export default Figure