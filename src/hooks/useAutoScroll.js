import { useEffect, useRef } from "react";

export const useAutoScroll = (dependencyArray, options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current
    if (!container) return;

    const { smooth = true, offset = 0 } = options

    container.scrollTo({
      top: container.scrollHeight - offset,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [dependencyArray])

  return containerRef
}


