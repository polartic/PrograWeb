import axios from "axios";

const articulosAPI = axios.create({
    baseURL: 'http://localhost:3001/api/articulos'
})

export default articulosAPI;