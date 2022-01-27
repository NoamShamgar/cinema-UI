import axios from "axios"
import errorResponse from "../helpers/jwtRefreshAxios"

const moviesAPI = axios.create({
    baseURL:"http://localhost:8000/movies",
    withCredentials:true,
    timeout:1000,
})

// adding a "middleware" to handle error due to expired access token, trying to get a new one
moviesAPI.interceptors.response.use((req => req),errorResponse)


const getAllMovies_DAL = async () => {
    return await moviesAPI.get("");
}

const getAllMoviesWithMembersWatched_DAL = async () => {
    return await moviesAPI.get("/membersWatched");
}

const getMovie_DAL = async (id) => {
    return await moviesAPI.get(`/${id}`);
}

const addMovie_DAL = async (movie) => {
    return await moviesAPI.post("",movie);
}

const updateMovie_DAL = async (id,movie) => {
    return await moviesAPI.put(`/${id}`,movie);
}

const deleteMovie_DAL = async (id) => {
    return await moviesAPI.delete(`/${id}`);
}

export {getAllMovies_DAL,getAllMoviesWithMembersWatched_DAL,getMovie_DAL,addMovie_DAL,updateMovie_DAL,deleteMovie_DAL}
