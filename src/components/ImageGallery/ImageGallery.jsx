import {PropTypes} from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ListItems } from './ImageGallery.styled';

export const ImageGallery = ({ materials, onClick }) => {
  return (
    <ListItems>
      {materials.map(material => (
        <ImageGalleryItem material={material} key={material.id} onClick={onClick } />
      ))}
    </ListItems>
  );
};


ImageGallery.propTypes = {
  material: PropTypes.shape({
    id : PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};