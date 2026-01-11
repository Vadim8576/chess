import { useEffect, useState } from "react"
import { useLoadImage } from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import appStore from "../../store/appStore";
import { useFigureDrag } from "../../hooks/useFigureDrag";


const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.$width}px;
    height: ${props => props.$height}px;
    cursor: ${props => props.$cursor};
    user-select: none;
    touch-action: none;
`;

const Img = styled.img`
    width: 80%;
    height: 80%;
    pointer-events: none;
`;

const CapturedFigure = observer(({ src }) => {


    const { isLoading, isError, image } = useLoadImage(src)
    if (isLoading) {
        return
    }

    if (isError) {
        return
    }

    if (!src) return

    return (
        <ImgWrapper
            $width={40}
            $height={40}
        >
            <Img src={image.src} />
        </ImgWrapper>
    )
})

export default CapturedFigure