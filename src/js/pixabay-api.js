import axios from 'axios';
import { alertToast } from '../main';

export const PAGE_SIZE = 15;
axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = {
  key: '19987924-b7a96d980a74a373c9da34c4a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PAGE_SIZE,
  q: '',
};
export function getImagesByQuery(query, page) {
  params.q = query;
  params.page = page;
  return axios
    .get('', { params })
    .then(res => res.data)
    .catch(e => alertToast.show(e.message));
}
