import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://omendapipaysglobel.online/api',
});

export const authWithPi = (payload) => api.post('/auth/pi', payload);
export const setAuthToken = (token) => { api.defaults.headers.common['Authorization'] = `Bearer ${token}`; };
export const restoreAuth = () => { /* session restore hook */ };
export const fetchProducts = () => api.get('/products');
export const fetchMe = () => api.get('/auth/me');

export default api;
