import { useLoadImage } from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import { COLORS } from "../../constants/gameInitial";

const ImgWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: auto;
cursor: pointer;
user-select: none;
touch-action: none;
pointer-events: none;
`;

const Img = styled.img`
width: 80%;
height: 80%;
pointer-events: none;
`;

const CapturedFigure = observer(({ src }) => {

  // console.log(src)


  const { isLoading, isError, image } = useLoadImage(src)
  if (isLoading) {
    return
  }

  if (isError) {
    return
  }

  if (!src) return

  return (
    <ImgWrapper>
      <Img src={image.src} />
    </ImgWrapper>
  )
})

export default CapturedFigure