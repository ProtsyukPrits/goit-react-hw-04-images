import { createPortal } from 'react-dom';
import { Overlay, Backdrop } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-component');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <Backdrop>{children}</Backdrop>
    </Overlay>,
    modalRoot
  );
};
