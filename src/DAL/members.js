import axios from "axios"
import errorResponse from "../helpers/jwtRefreshAxios"

const membersAPI = axios.create({
    baseURL:"https://cinema-employees-server.herokuapp.com/members",
    withCredentials:true,
    timeout:1000,
})

// adding a "middleware" to handle error due to expired access token, trying to get a new one
membersAPI.interceptors.response.use((res => res),errorResponse)


const getAllMembers_DAL = async () => {
    return await membersAPI.get();
}

const getMember_DAL = async (id) => {
    return await membersAPI.get(`/${id}`);
}

const addMember_DAL = async (member) => {
    return await membersAPI.post("",member);
}

const updateMember_DAL = async (id,member) => {
    return await membersAPI.put(`/${id}`,member);
}

const deleteMember_DAL = async (id) => {
    return await membersAPI.delete(`/${id}`);
}

const getMemberSubscription_DAL = async (memberId) => {
    return await axios.get(`/${memberId}/Subscription`);
}

export {getAllMembers_DAL,getMember_DAL,addMember_DAL,updateMember_DAL,deleteMember_DAL,getMemberSubscription_DAL}
