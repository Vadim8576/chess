import { useEffect, useRef, useState } from "react"
import useLoadImage from "../../hooks/useLoadImage"
import styled from 'styled-components'
import { board, files, ranks } from "../../constants/boardInitial";

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
    z-index: 100;
`;

const Img = styled.img`
    width: 80%;
    height: 80%;
    pointer-events: none;
`;

const Figure = ({ src, top, left, startX, startY, cellSize, setHighlightedCell, currentPlayer }) => {
    const { isLoading, isError, image } = useLoadImage(src)
    const [position, setPosition] = useState({ x: left, y: top })
    const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
    // const [grabCell, setGrabCell] = useState({ col: 0, row: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const imageRef = useRef(null)


    const handleMouseDown = (e) => {
        if (e.button !== 0) return // Только левая кнопка мыши
        setIsDragging(true)
        e.preventDefault()

        imageRef.current.style.zIndex = '101'
        imageRef.current.style.transition = 'none'

        const rect = imageRef.current.getBoundingClientRect()

        const x = e.clientX - startX
        const y = e.clientY - startY

        const colTemp = Math.floor(x / cellSize)
        const rowTemp = Math.floor(y / cellSize)

        const col = currentPlayer === 'white' ? colTemp : (7 - colTemp)
        const row = currentPlayer === 'white' ? rowTemp : (7 - rowTemp)

        console.log(col, row)

        setGrabCell({ col, row })
        setHighlightedCell({
            col,
            row,
            visible: true
        })
    };



    const handleMouseMove = (e) => {
        if (!isDragging) return

        // Получаем позицию относительно контейнера
        const rect = imageRef.current.getBoundingClientRect()

        const x = e.clientX - startX
        const y = e.clientY - startY

        const xc = x - rect.width / 2
        const yc = y - rect.height / 2

        const colTemp = Math.floor(x / cellSize)
        const rowTemp = Math.floor(y / cellSize)

        const col = currentPlayer === 'white' ? colTemp : (7 - colTemp)
        const row = currentPlayer === 'white' ? rowTemp : (7 - rowTemp)

        setPosition({ x: xc, y: yc })

        setHighlightedCell({
            col,
            row,
            visible: true
        })


        if (col < 0 || col > 7 || row < 0 || row > 7) {
            setHighlightedCell({
                col: grabCell.col,
                row: grabCell.row,
                visible: true
            })
            return
        }
    }



    const handleMouseUp = (e) => {
        setIsDragging(false)
        imageRef.current.style.zIndex = '100'
        imageRef.current.style.transition = '.3s'

        const x = e.clientX - startX
        const y = e.clientY - startY
        const colTemp = Math.floor(x / cellSize)
        const rowTemp = Math.floor(y / cellSize)

        const col = currentPlayer === 'white' ? colTemp : (7 - colTemp)
        const row = currentPlayer === 'white' ? rowTemp : (7 - rowTemp)


        if (col < 0 || col > 7 || row < 0 || row > 7) {
            console.log('Фигура вне доски')
            setPosition({
                x: grabCell.col * cellSize,
                y: grabCell.row * cellSize
            })
            setHighlightedCell(prev => ({
                ...prev,
                visible: false
            }))
            return
        }

        const newX = cellSize * col
        const newY = cellSize * row
        setPosition({ x: newX, y: newY })
        setHighlightedCell((prev) => ({
            ...prev,
            visible: false
        }))

        
        const newBoard = ranks.map((rank, y) => {
            return files.map((file, x) => {
                return (y === newY && x === newX) ? '!!' : board[y][x]
            })
        })
        
        console.table(newBoard)
    }




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
        style={{
            top: position.y,
            left: position.x
        }}
    >
        <Img src={image.src} />
    </ImgWrapper>
)
}

export default Figure