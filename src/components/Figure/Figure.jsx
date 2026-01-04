import { useEffect, useRef, useState } from "react";
import useLoadImage from "../../hooks/useLoadImage"
import styled from 'styled-components';


const ImgWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 62.5px;
    height: 62.5px;
    user-select: none;
    touch-action: none;
    cursor: ${props => props.cursor};
    z-index: 100;
`;


const Img = styled.img`
    width: 80%;
    height: 80%;
    events-pointer: none;
`;

const Figure = ({ src, top, left, startX, startY }) => {
    const { isLoading, isError, image } = useLoadImage(src)

    const [position, setPosition] = useState({ x: left, y: top });
    const [isDragging, setIsDragging] = useState(false);
    const imageRef = useRef(null);


    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Только левая кнопка мыши
        setIsDragging(true);
        e.preventDefault();

        imageRef.current.style.zIndex = '101'
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        // Получаем позицию относительно контейнера
        const rect = imageRef.current.getBoundingClientRect();

        const x = e.clientX - rect.width / 2 - startX
        const y = e.clientY - rect.height / 2 - startY

        setPosition({ x, y });
    };



    const handleMouseUp = () => {
        setIsDragging(false);
        imageRef.current.style.zIndex = '100'
    };

    useEffect(() => {
        setPosition({ x: left, y: top })
    }, [left, top])

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    if (isLoading) {
        return <div>.</div>;
    }

    if (isError) {
        return <div>!</div>;
    }

    if (!src) return

    return (
        <ImgWrapper
            ref={imageRef}
            onMouseDown={handleMouseDown}
            draggable={false}
            cursor={isDragging ? 'grabbing' : 'grab'}
            style={{
                top: position.y,
                left: position.x
            }}
        >
            <Img
                src={image.src}
                alt="F"
            />
        </ImgWrapper>
    )
}

export default Figure