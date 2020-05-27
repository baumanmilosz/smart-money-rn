import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://d69af8a6.ngrok.io',
});

export default instance;
