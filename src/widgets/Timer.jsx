import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/gameInitial";



const TimerWrapper = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
height: 100%;
font-size: 3vmin;
font-weight: bold;
color: ${COLORS.neutral};
// color: activePlayer === 'white' ? 'red' : '#666';
transition: color 0.3s;
height: 100%;
`

const Timer = observer(({ maxTime }) => {
  const [time, setTime] = useState(0)
  const [activePlayer, setActivePlayer] = useState(null) // null = остановлены


  useEffect(() => {
    setTime(maxTime)
  }, [maxTime])


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }


  return (
    <TimerWrapper>
      {formatTime(time)}
    </TimerWrapper>
  )
})

export default Timer