import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://11d0a15df77c.ngrok.io',
});

export default instance;
