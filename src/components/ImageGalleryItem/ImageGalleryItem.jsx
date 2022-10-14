import { PropTypes } from 'prop-types'
import { Items, Imgs } from './ImageGalleryItem.styled';


export const ImageGalleryItem = ({ material: { webformatURL, user, id}, onClick}) => {
  return (
    <Items onClick={onClick} id={id}>
      <Imgs src={webformatURL} alt={user} width="200" height="150" />
    </Items>
  );
};

ImageGalleryItem.propTypes = {
  material: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
}
