import axios from "axios";
import errorResponse from "../helpers/jwtRefreshAxios"

const employeesAPI = axios.create({
    baseURL:"http://localhost:8000/employees",
    withCredentials:true,
    timeout:1000,
})

// adding a "middleware" to handle error due to expired access token, trying to get a new one
employeesAPI.interceptors.response.use((req => req),errorResponse)


const getAllEmployees_DAL = async () => {
    return await employeesAPI.get();
}

const getEmployee_DAL = async (id) => {
    return await employeesAPI.get(`/${id}`);
}

const addEmployee_DAL = async (employee) => {
    return await employeesAPI.post("",employee);
}

const updateEmployee_DAL = async (id,employee) => {
    return await employeesAPI.put(`/${id}`,employee);
}

const deleteEmployee_DAL = async (id) => {
    return await employeesAPI.delete(`/${id}`);
}

const setPassToEmployee_DAL = async (email,password) => {
    return await employeesAPI.put("/setpass",{email,password});
}

export {getAllEmployees_DAL,getEmployee_DAL,addEmployee_DAL,updateEmployee_DAL,deleteEmployee_DAL,setPassToEmployee_DAL}
