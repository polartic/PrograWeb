import axios from "axios";

const registrosAPI = axios.create({
    baseURL: 'http://localhost:3001/api/registros'
})

export default registrosAPI;