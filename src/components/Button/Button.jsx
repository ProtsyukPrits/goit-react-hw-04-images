import { LoadButton } from './Button.styled';
import { PropTypes } from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <LoadButton type="button" onClick={loadMore}>
      Load more!
    </LoadButton>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
}
