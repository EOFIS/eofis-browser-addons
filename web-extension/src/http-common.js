import axios from "axios";
import router from "./router";

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
    if (error) {
        const srcRQ = error.config;
        if (error.response.status === 401 && !srcRQ._retry) {
            srcRQ._retry = true;
            return router.push("/login");
        }
    }
});
axios.defaults.withCredentials = true;
export default axios.create({
    baseURL: 'http://localhost:5000/api/v0',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});
