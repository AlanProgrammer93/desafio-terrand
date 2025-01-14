import axios from 'axios';
import { SERVER } from '../constants';

const clientAxios = axios.create({
    baseURL: `${SERVER}`
});

export default clientAxios;