import { memo } from 'react';
import { observer } from "mobx-react-lite";
import styled from 'styled-components'
import AppStore from "../../store/AppStore";


const ImgWrapper = styled.div.attrs(props => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    width: `${props.$width}px`,
    height: `${props.$height}px`,

  },
}))`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 102;
  cursor: grabbing;
  user-select: none;
  touch-action: none;
  -webkit-user-drag: none;
`

const Img = styled.img`
  width: 75%;
  height: 75%;
  pointer-events: none;
  -webkit-user-drag: none;
	user-select: none;
  touch-action: none;
`

const ImgMemo = memo(({ image }) => {
  return <Img src={image.src} />
})

const DraggableFigure = observer(({ image, position }) => {

  if(!position) return null

  const cellSize = AppStore.board.cellSize

  if (!image) return

  return (
    <ImgWrapper
      $width={cellSize}
      $height={cellSize}
      $top={position.y}
      $left={position.x}
    >
      <ImgMemo image={image} />
      {/* <Img src={image.src} /> */}
    </ImgWrapper>
  )
})


export default DraggableFigure