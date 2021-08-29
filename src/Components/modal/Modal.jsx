import React, { Component } from 'react';
import { ModalStyled } from './ModalStyled';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escapePress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapePress);
  }
  escapePress = (e) => {
    if (e.key === 'Escape') {
      this.props.isModalOpen(e);
    }
  };
  render() {
    return (
      <ModalStyled
        onClick={this.props.isModalOpen}
        onKeyPress={this.escapePress}
      >
        <div className="Modal">
          <img src={this.props.image} alt={this.props.alt} />
        </div>
      </ModalStyled>
    );
  }
}

export default Modal;

Modal.propTypes = {
  isModalOpen: PropTypes.func,
  image: PropTypes.string,
  alt: PropTypes.string,
};
