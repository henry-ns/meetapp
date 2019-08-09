import axios from 'axios';

export const host = 'http://192.168.0.198:3333';

export default axios.create({
  baseURL: host,
});
