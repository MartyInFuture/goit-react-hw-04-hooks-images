import { ButtonStyled } from './ButtonStyled';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Button = ({ setPage, spinner }) => {
  return (
    <ButtonStyled>
      {spinner ? (
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : (
        <button className="Button" type="button" onClick={setPage}>
          Load more
        </button>
      )}
    </ButtonStyled>
  );
};

export default Button;

Button.propTypes = {
  setPage: PropTypes.func,
  spinner: PropTypes.bool,
};
