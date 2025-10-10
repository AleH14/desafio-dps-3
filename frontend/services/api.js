import axios from 'axios';

//url del backend
const API= axios.create({
    baseURL:'http://192.168.1.26:3000',
    headers: {
    'Content-Type': 'application/json'
  }
});
export default API;