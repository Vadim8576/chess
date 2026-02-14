import { useGamepad } from "../../hooks/useGamepad";

const GameController = () => {
  const { gamepadState, isConnected } = useGamepad();

  return (
    <div style={{
      position: "absolute",
      top: '0',
      left: '0'
    }}>
      <h2>Геймпад: {isConnected ? 'Подключен' : 'Не подключен'}</h2>
      {isConnected && gamepadState && (
        <div>
          <p>ID: {gamepadState.id}</p>
          <p>Кнопки: {gamepadState.buttons
            .map((pressed, i) => pressed ? `B${i}` : null)
            .filter(b => b)
            .join(', ')}</p>
          <p>Оси: {gamepadState.axes.map(a => a.toFixed(2)).join(', ')}</p>
        </div>
      )}
    </div>
  );
}


export default GameController