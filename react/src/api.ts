import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
//    baseURL: `${window.location.origin}/api`,
    baseURL: 'http://localhost:5000/api/v0',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    timeout: 10000
});
export default api;