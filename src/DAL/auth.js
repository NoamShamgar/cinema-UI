import axios from "axios"
const authAPI = axios.create({
    baseURL:"http://localhost:8000/auth",
    withCredentials:true,
    timeout:1000,
})


const login_DAL = async (email,password) => {
    return await authAPI.post("/login",{email,password});
}

const logout_DAL = async () => {
    return await authAPI.delete("/logout");
}

const getTokenWithRefreshToken_DAL = async (refreshToken) => {
    return await authAPI.post("/refresh",refreshToken);
}


export {login_DAL,logout_DAL,getTokenWithRefreshToken_DAL}
