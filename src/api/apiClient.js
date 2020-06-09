import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://2d43d5958430.ngrok.io',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
