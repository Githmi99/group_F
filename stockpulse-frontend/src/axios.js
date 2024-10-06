import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api', // This should match your backend server URL
});

export default instance;
