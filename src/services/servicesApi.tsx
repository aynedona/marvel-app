import axios from 'axios';
import { generateAuthParams } from './auth';

const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public',
});

api.interceptors.request.use((config) => {
    config.url += `?${generateAuthParams()}`;
    return config;
});

export default api;