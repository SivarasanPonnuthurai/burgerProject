import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-704f3.firebaseio.com/'
});

export default instance;