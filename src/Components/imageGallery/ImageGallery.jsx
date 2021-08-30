import ImagesGalleryItem from './imageGalleryItem/ImagesGalleryItem';
import { ApiGetData } from '../api/ApiGetData';
import { useState, useEffect } from 'react';
import { ImagesGalleryStyled } from './ImagesGalleryStyled';
import Searchbar from '../searchbar/Searchbar';
import Button from '../button/Button';

const ImageGallery = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [spinner, setSpinner] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imagesPerPage] = useState(15);

  useEffect(() => {
    if (searchInput === '') return false;
    search(page, imagesPerPage);
    setData([]);
    imageSetToZero();
  }, [searchInput]);

  useEffect(() => {
    if (page !== 1) {
      search(page, imagesPerPage);
      imageSetToZero();
    }
  }, [page]);

  useEffect(() => {
    if (imagesLoaded === imagesPerPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      imageSetToZero();
    }
  }, [imagesLoaded]);

  const imageSetToZero = () => {
    setSpinner((prev) => !prev);
    setImagesLoaded(0);
  };

  const search = (page, imagesPerPage) => {
    ApiGetData(searchInput, page, imagesPerPage).then((data) => {
      data.map((item) => setData((prev) => [...prev, item]));
    });
  };

  return (
    <>
      <Searchbar setSearch={(value) => setSearchInput(value)} />
      <ImagesGalleryStyled>
        {data.map((item) => (
          <ImagesGalleryItem
            key={item.id}
            item={item}
            imageOnLoad={() => {
              setImagesLoaded((prev) => prev + 1);
            }}
          />
        ))}
      </ImagesGalleryStyled>
      {data.length !== 0 && data.length % imagesPerPage === 0 ? (
        <Button setPage={() => setPage((prev) => prev + 1)} spinner={spinner} />
      ) : (
        <h2 className="notification">Notification</h2>
      )}
    </>
  );
};

export default ImageGallery;
