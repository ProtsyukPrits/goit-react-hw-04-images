import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { addBaseFetch } from '..//services/api';
import { Container } from './Common.styled';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photoIsActive, setPhotoIsActive] = useState(null);
  const [perPage] = useState(12);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    try {
      const dataFetch = async () => {
        setIsLoading(true);

        const data = await addBaseFetch(query, page, perPage);
        setMaterials(materials => [...materials, ...data.hits]);

        setIsLoading(false);
      };
      dataFetch();
    } catch (error) {
      setError({ error });
    }
  }, [page, perPage, query]);

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Nothing found, enter something in the search');
    }
    setPage(1);
    setQuery(e.target.elements.query.value);
    setMaterials([]);
    setTotalPages(null);
    e.target.reset();
  };

  const handleLoadMore = async e => {
    const loadMoreDataFetch = await addBaseFetch(query);
    const totalPages = Math.ceil(loadMoreDataFetch.total / perPage);
    setTotalPages(totalPages);

    setPage(prevState => prevState + 1);
  };

  const openModal = e => {
    const imageId = Number(e.currentTarget.id);
    const photoIsActive = materials.find(image => image.id === imageId);
    setPhotoIsActive(photoIsActive);
    setShowModal({ showModal: true });
  };

  const closeModal = () => {
    setShowModal(showModal);
  };

  return (
    <Container>
      {showModal && (
        <Modal onClose={closeModal}>
          {/* Я вирішив зробити модалку як універсальнна обгортка,
             а в середині рендерити контент який потрібно. */}
          <img src={photoIsActive.largeImageURL} alt={photoIsActive.tags} />
        </Modal>
      )}
      {/* Input */}
      <Searchbar onSubmit={handleSubmit} />
      {materials.length === 0 && !isLoading && (
        <p>Please, enter something in the search</p>
      )}
      {/*Toast  */}
      {query === '' && <ToastContainer />}
      {/* Gallery */}
      {error && <p>Wooops some errors!!!</p>}
      {materials.length > 0 && (
        <ImageGallery materials={materials} onClick={openModal} />
      )}
      {/* Loader */}
      {isLoading && <Loader />}

      {/* LoadMoreBTN */}
      {page === totalPages
        ? !isLoading && <p>End of content</p>
        : materials.length > 0 && <Button loadMore={handleLoadMore} />}
    </Container>
  );
};

