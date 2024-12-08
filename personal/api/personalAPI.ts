import axios from "axios";

const personalAPI = axios.create({
    baseURL: 'http://localhost:3001/api/personal'
})

export default personalAPI;