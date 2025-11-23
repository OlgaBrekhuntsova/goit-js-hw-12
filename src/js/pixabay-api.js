import axios from 'axios';
import { alertToast } from '../main';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = {
  key: '19987924-b7a96d980a74a373c9da34c4a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 18,
  q: '',
};
export function getImagesByQuery(query) {
  params.q = query;
  return axios
    .get('', { params })
    .then(res => res.data)
    .catch(e => alertToast.show(e.message));
}
