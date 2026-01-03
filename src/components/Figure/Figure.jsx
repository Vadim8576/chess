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
    user-select: none; // Запрещаем выделение
    touch-action: none; // Для мобильных устройств
    top: ${props => props.top}px;
    left: ${props => props.left}px;
`;

const Img = styled.img`
    width: 80%;
    height: 80%;
    events-pointer: none;
`;

const Figure = ({ src, top, left, startX, startY }) => {
    const { isLoading, isError, image } = useLoadImage(src)

    const [position, setPosition] = useState({ x: left, y: top });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const imageRef = useRef(null);


    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Только левая кнопка мыши
        setIsDragging(true);
        e.preventDefault();
        setStartPos({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        // Получаем позицию относительно контейнера
        const rect = imageRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.width / 2 - startX,
            y: e.clientY - rect.height / 2 - startY
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
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
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
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