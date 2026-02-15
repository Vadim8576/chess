import { useEffect, useState } from "react";
import { useGamepad } from "../../hooks/useGamepad";
import { observer } from "mobx-react-lite";





const GameController = observer(() => {
  const { gamepadState, isConnected, isButtonPressed } = useGamepad();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (isButtonPressed(15)) {
      setX(prevX => prevX + 1)
    }

    if (isButtonPressed(14)) {
      setX(prevX => prevX - 1)
    }

    if (isButtonPressed(12)) {
      setY(prevY => prevY - 1)
    }

    if (isButtonPressed(13)) {
      setY(prevY => prevY + 1)
    }
  }, [isButtonPressed])

  return (
    <div style={{
      position: "absolute",
      top: '0',
      left: '0'
    }}>
      <h2>Геймпад: {isConnected ? 'Подключен' : 'Не подключен'}</h2>
      <p>Координата X: {x}</p>
      <p>Координата Y: {y}</p>
      {isConnected && gamepadState && (
        <div>
          <p>ID: {gamepadState.id}</p>
          <p>Кнопки: {gamepadState.buttons
            .map((pressed, i) => pressed ? `B${i}` : null)
            .filter(b => b)
            .join(', ') || 'Нет нажатых'}</p>
          <p>Оси: {gamepadState.axes.map(a => a.toFixed(2)).join(', ')}</p>
        </div>
      )}
    </div>
  );
})


export default GameController