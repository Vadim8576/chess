import { createPortal } from 'react-dom';


function Portal({ isOpen, onClose, children }) {
  if (!isOpen) return null


  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // полупрозрачная подложка
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999'
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {children}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>,
    document.getElementById('root') // контейнер из HTML
  )
}

export default Portal