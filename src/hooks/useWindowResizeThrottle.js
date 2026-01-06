import { useState, useEffect } from 'react';

function useWindowResizeThrottle(throttleMs = 300) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let lastCall = 0;
    let timeoutId = null;

    const handleResize = () => {
      const now = Date.now();

      // Если прошло достаточно времени — обновляем состояние
      if (now - lastCall >= throttleMs) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        lastCall = now;
      } else {
        // Иначе планируем обновление после истечения интервала
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          lastCall = now;
        }, throttleMs - (now - lastCall));
      }
    };

    // Подписываемся на событие resize
    window.addEventListener('resize', handleResize);

    // Очищаем слушатель при удалении компонента
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return windowSize;
}

export default useWindowResizeThrottle;
