import axios from "axios";
import errorResponse from "../helpers/jwtRefreshAxios"

const checkSessionAPI = axios.create({
    baseURL:"http://localhost:8000/checkSession",
    withCredentials:true,
    timeout:1000,
})

checkSessionAPI.interceptors.response.use((req => req),errorResponse)


const checkSession_DAL = async () => {
    return await checkSessionAPI.get();
}

export default checkSession_DAL