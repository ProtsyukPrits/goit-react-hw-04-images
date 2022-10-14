import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { addBaseFetch } from '..//services/api';
//
import { Container } from './Common.styled';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  state = {
    materials: [],
    isLoading: false,
    error: null,
    showModal: false,
    query: '',
    page: 1,
    photoIsActive: null,
    perPage: 12,
    totalPages: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, perPage } = this.state;
    try {
      if (prevState.page !== page || prevState.query !== query) {
        this.setState({ isLoading: true });
        const dataFetch = await addBaseFetch(query, page, perPage);
        this.setState(prevState => ({
          materials: [...prevState.materials, ...dataFetch.hits],
          isLoading: false,
        }));
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Nothing found, enter something in the search');
    }

    this.setState({
      page: 1,
      query: e.target.elements.query.value,
      materials: [],
      totalPages: null,
    });
    e.target.reset();
  };

  handleLoadMore = async e => {
    const { query, perPage } = this.state;
    //
    const loadMoreDataFetch = await addBaseFetch(query);
    const totalPages = Math.ceil(loadMoreDataFetch.total / perPage);
    this.setState({ totalPages: totalPages });
    // ------

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = e => {
    const imageId = Number(e.currentTarget.id);
    const photoIsActive = this.state.materials.find(
      image => image.id === imageId
    );
    this.setState({
      photoIsActive,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      query,
      materials,
      page,
      totalPages,
      error,
      showModal,
      photoIsActive,
      isLoading,
    } = this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.closeModal}>
            {/* Я вирішив зробити модалку як універсальнна обгортка,
             а в середині рендерити контент який потрібно. */}
            <img src={photoIsActive.largeImageURL} alt={photoIsActive.tags} />
          </Modal>
        )}
        {/* Input */}
        <Searchbar onSubmit={this.handleSubmit} />
        {materials.length === 0 && !isLoading && <p>Please, enter something in the search</p>}
        {/*Toast  */}
        {query === '' && <ToastContainer />}
        {/* Gallery */}
        {error && <p>Wooops some errors!!!</p>}
        {materials.length > 0 && (
          <ImageGallery materials={materials} onClick={this.openModal} />
        )}
        {/* Loader */}
        {isLoading && <Loader />}

        {/* LoadMoreBTN */}
        {page === totalPages
          ? !isLoading && <p>End of content</p>
          : materials.length > 0 && (
              <Button loadMore={this.handleLoadMore} isLoading={isLoading} />
            )}
      </Container>
    );
  }
}
