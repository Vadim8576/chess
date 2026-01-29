import { useState, useRef, useEffect } from 'react';

const ChessClock = () => {
  const [whiteTime, setWhiteTime] = useState(600) // 10 минут по умолчанию
  const [blackTime, setBlackTime] = useState(600)

  // Кто сейчас ходит (true = белые, false = чёрные)
  const [activePlayer, setActivePlayer] = useState(null) // null = остановлены

  // Интервал для отсчёта
  const timerId = useRef(null)

  // Форматирование времени (мм:сс)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Запуск таймера для игрока
  const startTimer = (player) => {
    if (activePlayer !== null) return // уже идёт игра

    setActivePlayer(player)
    timerId.current = setInterval(() => {
      if (player === 'white') {
        setWhiteTime(prev => prev > 0 ? prev - 1 : 0)
      } else {
        setBlackTime(prev => prev > 0 ? prev - 1 : 0)
      }
    }, 1000)
  }

  // Остановка таймера
  const stopTimer = () => {
    clearInterval(timerId.current)
    timerId.current = null
    setActivePlayer(null)
  };

  // Переключение на другого игрока
  const switchPlayer = () => {
    if (activePlayer === null) return

    stopTimer()
    const nextPlayer = activePlayer === 'white' ? 'black' : 'white'
    startTimer(nextPlayer);
  };

  // Сброс таймеров (с возможностью задать новое время)
  const resetClocks = (minutes = 10) => {
    const totalSeconds = minutes * 60
    stopTimer();
    setWhiteTime(totalSeconds);
    setBlackTime(totalSeconds);
  };

  // Автостоп при нуле
  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      stopTimer()
    }
  }, [whiteTime, blackTime])

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2>Шахматные часы</h2>

      {/* Управление установкой времени */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Установить время (мин):{' '}
          <input
            type="number"
            min="1"
            defaultValue="10"
            style={{ width: '60px' }}
            onChange={(e) => resetClocks(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Таймеры */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', color: '#555' }}>Белые</div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: activePlayer === 'white' ? 'red' : 'black',
              transition: 'color 0.3s'
            }}
          >
            {formatTime(whiteTime)}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', color: '#555' }}>Чёрные</div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: activePlayer === 'black' ? 'red' : 'black',
              transition: 'color 0.3s'
            }}
          >
            {formatTime(blackTime)}
          </div>
        </div>
      </div>

      {/* Кнопки управления */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => startTimer('white')} disabled={activePlayer !== null}>
          Старт белые
        </button>
        <button onClick={() => startTimer('black')} disabled={activePlayer !== null}>
          Старт чёрные
        </button>
        <button onClick={switchPlayer} disabled={activePlayer === null}>
          Передать ход
        </button>
        <button onClick={stopTimer} disabled={activePlayer === null}>
          Остановить
        </button>
        <button onClick={() => resetClocks(10)}>
          Сброс (10 мин)
        </button>
      </div>
    </div>
  )
}

export default ChessClock
