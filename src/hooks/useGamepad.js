import { useState, useEffect, useCallback, useRef } from 'react';

export const useGamepad = () => {
  const [gamepadState, setGamepadState] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const prevStateRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    function pollGamepads() {
      const gamepads = navigator.getGamepads().filter(Boolean);

      if (gamepads.length > 0) {
        const gamepad = gamepads[0];
        const currentButtons = gamepad.buttons.map(b => b.pressed);
        const prevButtons = prevStateRef.current?.buttons || [];

        // Определяем события: нажатие/отпускание
        const buttonEvents = {};
        for (let i = 0; i < currentButtons.length; i++) {
          const prev = prevButtons[i] || false;
          const curr = currentButtons[i];

          if (curr && !prev) {
            buttonEvents[i] = 'pressed';
          } else if (!curr && prev) {
            buttonEvents[i] = 'released';
          }
        }

        const newState = {
          id: gamepad.id,
          buttons: currentButtons,
          axes: [...gamepad.axes],
          buttonEvents // Сохраняем события
        };

        // Обновляем состояние только при изменениях
        const hasChanges = !prevStateRef.current ||
          prevStateRef.current.id !== newState.id ||
          !arraysEqual(prevStateRef.current.buttons, newState.buttons) ||
          !arraysEqual(prevStateRef.current.axes, newState.axes);

        if (hasChanges) {
          setIsConnected(true);
          setGamepadState(newState);
          prevStateRef.current = newState;
        }
      } else {
        if (prevStateRef.current !== null) {
          setIsConnected(false);
          setGamepadState(null);
          prevStateRef.current = null;
        }
      }

      animationFrameId = requestAnimationFrame(pollGamepads);
    }

    pollGamepads();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  // Функция проверки нажатия — теперь использует сохранённые события
  const isButtonPressed = useCallback((buttonIndex) => {
    return gamepadState?.buttonEvents?.[buttonIndex] === 'pressed';
  }, [gamepadState]);

  return { gamepadState, isConnected, isButtonPressed };
}