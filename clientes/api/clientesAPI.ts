import axios from "axios";

const clientesAPI = axios.create({
    baseURL: 'http://localhost:3001/api/clientes'
})

export default clientesAPI;