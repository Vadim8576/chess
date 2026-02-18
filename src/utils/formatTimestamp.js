export const formatTimestamp = (seconds) => {
  const date = new Date(seconds * 1000)
  return date.toLocaleString(); // формат зависит от локали браузера
}