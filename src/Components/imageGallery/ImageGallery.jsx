import ImagesGalleryItem from './imageGalleryItem/ImagesGalleryItem';
import { ApiGetData } from '../api/ApiGetData';
import React, { Component } from 'react';
import { ImagesGalleryStyled } from './ImagesGalleryStyled';
import Searchbar from '../searchbar/Searchbar';
import Button from '../button/Button';

class ImageGallery extends Component {
  state = {
    data: [],
    search: '',
    page: 1,
    spinner: true,
    imagesLoaded: 0,
    imagesPerPage: 15,
  };

  componentDidMount() {
    if (this.state.search === '') return false;
    this.search(this.state.page, this.state.imagesPerPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imagesLoaded !== this.state.imagesLoaded) {
      if (this.state.imagesLoaded === this.state.imagesPerPage) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        this.setState({ spinner: false, imageOnLoad: 0 });
      }
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.search(this.state.page, this.state.imagesPerPage);
      this.setState({ imagesLoaded: 0, spinner: true });
    }
    if (prevState.search !== this.state.search) {
      this.setState({ data: [], page: 1 }, () => {
        this.search(this.state.page, this.state.imagesPerPage);
      });
    }
  }

  search(page, imagesPerPage) {
    ApiGetData(this.state.search, page, imagesPerPage).then((data) => {
      data.map((item) =>
        this.setState((prev) => ({ data: [...prev.data, item] }))
      );
    });
  }

  imageOnLoad = () => {
    this.setState((prev) => ({ imagesLoaded: prev.imagesLoaded + 1 }));
  };

  setSearch = (value) => {
    this.setState({ search: value });
  };

  setPage = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar setSearch={this.setSearch} />
        <ImagesGalleryStyled>
          {this.state.data.map((item) => (
            <ImagesGalleryItem
              key={item.id}
              item={item}
              imageOnLoad={this.imageOnLoad}
            />
          ))}
        </ImagesGalleryStyled>
        {this.state.data.length !== 0 &&
        this.state.data.length % this.state.imagesPerPage === 0 ? (
          <Button setPage={this.setPage} spinner={this.state.spinner} />
        ) : (
          <h2 className="notification">Notification</h2>
        )}
      </>
    );
  }
}

export default ImageGallery;
