import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.clone.rodrigovieira.work',
});

export default api;
