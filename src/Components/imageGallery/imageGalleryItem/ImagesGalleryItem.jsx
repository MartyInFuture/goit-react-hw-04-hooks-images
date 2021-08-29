import { useState } from 'react';
import { ImagesGalleryItemStyled } from './ImagesGalleryItemStyled';
import Modal from '../../modal/Modal';
import PropTypes from 'prop-types';

const ImagesGalleryItem = ({ item, imageOnLoad }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isModalOpen = (e) => {
    if (e.target === e.currentTarget || e.key === 'Escape')
      setModalIsOpen((prev) => !prev);
  };

  return (
    <>
      <ImagesGalleryItemStyled>
        <img
          src={item.webformatURL}
          alt={item.tags}
          className="ImageGalleryItem-image"
          onLoad={imageOnLoad}
          onClick={isModalOpen}
        />
      </ImagesGalleryItemStyled>
      {modalIsOpen ? (
        <Modal
          image={item.largeImageURL}
          alt={item.tags}
          isModalOpen={isModalOpen}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ImagesGalleryItem;

ImagesGalleryItem.propTypes = {
  item: PropTypes.object,
  imageOnLoad: PropTypes.func,
};
