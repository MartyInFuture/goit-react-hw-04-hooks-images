import { useEffect } from 'react';
import { ModalStyled } from './ModalStyled';
import PropTypes from 'prop-types';

const Modal = ({ isModalOpen, alt, image }) => {
  useEffect(() => {
    document.addEventListener('keydown', escapePress);
  }, []);

  const escapePress = (e) => {
    if (e.key === 'Escape') {
      modalClose(e);
    }
  };

  const modalClose = (e) => {
    isModalOpen(e);
    document.removeEventListener('keydown', escapePress);
  };

  return (
    <ModalStyled onClick={modalClose} onKeyPress={escapePress}>
      <div className="Modal">
        <img src={image} alt={alt} />
      </div>
    </ModalStyled>
  );
};

export default Modal;

Modal.propTypes = {
  isModalOpen: PropTypes.func,
  image: PropTypes.string,
  alt: PropTypes.string,
};
