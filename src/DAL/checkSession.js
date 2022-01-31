import axios from "axios";
import errorResponse from "../helpers/jwtRefreshAxios"

const checkSessionAPI = axios.create({
    baseURL:"http://localhost:8000/checkSession",
    withCredentials:true,
    timeout:1000,
});

// adding a "middleware" to handle error due to expired access token, trying to get a new one
checkSessionAPI.interceptors.response.use((res => res),errorResponse)


const checkSession_DAL = async () => {
    return await checkSessionAPI.get();
}

export default checkSession_DAL