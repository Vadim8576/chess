import { useState, useEffect } from 'react';

export const useGamepad = () => {
  const [gamepadState, setGamepadState] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Обработчик подключения
    const handleGamepadConnected = (e) => {
      setIsConnected(true);
      console.log('Геймпад подключён:', e.gamepad.id);
    };

    // Обработчик отключения
    const handleGamepadDisconnected = (e) => {
      setIsConnected(false);
      setGamepadState(null);
      console.log('Геймпад отключён');
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Цикл опроса
    let animationFrameId;
    function poll() {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad && gamepad.connected) {
        setGamepadState({
          buttons: gamepad.buttons.map(b => b.pressed),
          axes: gamepad.axes,
          id: gamepad.id
        });
      }

      animationFrameId = requestAnimationFrame(poll);
    }

    poll();

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { gamepadState, isConnected };
}