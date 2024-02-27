import axios from "axios";
import router from "../router";
export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
})

/* axiosClient.interceptors.request.use((config) => {
    
    // config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
}) */

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401){
        router.navigate('\login')
        return error;
    }
    throw error;
})