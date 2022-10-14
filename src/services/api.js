import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29587417-df190bcf57e6bfa4b1db84c62';


export const addBaseFetch = async (query, page, perPage) => {
  const baseFetch = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return baseFetch.data;
};




