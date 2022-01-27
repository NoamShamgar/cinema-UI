import axios from "axios"
import errorResponse from "../helpers/jwtRefreshAxios"

const subscriptionsAPI = axios.create({
    baseURL:"http://localhost:8000/subscriptions",
    withCredentials:true,
    timeout:1000,
})

// adding a "middleware" to handle error due to expired access token, trying to get a new one
subscriptionsAPI.interceptors.response.use((req => req),errorResponse)


const getAllSubscriptions_DAL = async () => {
    return await subscriptionsAPI.get("");
}

const getSubscription_DAL = async (id) => {
    return await subscriptionsAPI.get(`/${id}`);
}

const addSubscription_DAL = async (subscription) => {
    return await subscriptionsAPI.post("",subscription);
}

const updateSubscription_DAL = async (id,subscription) => {
    return await subscriptionsAPI.put(`/${id}`,subscription);
}

const deleteSubscription_DAL = async (id) => {
    return await subscriptionsAPI.delete(`/${id}`);
}

const addMovieToSubscription_DAL = async (id,obj) => {
    return await subscriptionsAPI.post(`/${id}/movies`,obj);
}

export {getAllSubscriptions_DAL,getSubscription_DAL,addSubscription_DAL,updateSubscription_DAL,deleteSubscription_DAL,addMovieToSubscription_DAL}
