import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import appStore from "../../store/appStore";


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
  z-index: 101;
  cursor: grabbing;
  user-select: none;
  touch-action: none;
  -webkit-user-drag: none;
  // border: 1px red solid;
`;

const Img = styled.img`
  width: 75%;
  height: 75%;
  pointer-events: none;
  -webkit-user-drag: none;
	user-select: none;
  touch-action: none;
`;

const DraggableFigure = observer(({ image, position }) => {

  const cellSize = appStore.board.cellSize

  if (!image) return

  return (
    <ImgWrapper
      $width={cellSize}
      $height={cellSize}
      $top={position.y}
      $left={position.x}
    >
      <Img src={image.src} />
    </ImgWrapper>
  )
})


export default DraggableFigure