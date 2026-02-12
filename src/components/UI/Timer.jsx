import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

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
    <div style={{ textAlign: 'left', maxHeight: '100%' }}>
      {/* <div style={{ fontSize: '16px', color: '#555' }}>Белые</div> */}
      <div
        style={{
          margin: '0 0 0 10px',
          fontSize: '4.1vmin',
          fontWeight: 'bold',
          color: activePlayer === 'white' ? 'red' : '#666',
          transition: 'color 0.3s'
        }}
      >
        {formatTime(time)}
      </div>
    </div>
  )
})

export default Timer