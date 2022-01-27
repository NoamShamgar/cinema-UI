import {getAllEmployees_DAL,getEmployee_DAL,addEmployee_DAL,updateEmployee_DAL,deleteEmployee_DAL,setPassToEmployee_DAL} from "../DAL/employees";

const getAllEmployees_UTIL = async () => {
    return (await getAllEmployees_DAL()).data;
}

const getEmployee_UTIL = async (id) => {
    return (await getEmployee_DAL(id)).data;
}

const addEmployee_UTIL = async (employee) => {
    return (await addEmployee_DAL(employee)).data;
}

const updateEmployee_UTIL = async (id,employee) => {
    return (await updateEmployee_DAL(id,employee)).data;
}

const deleteEmployee_UTIL = async (id) => {
    return (await deleteEmployee_DAL(id)).data;
}

const setPassToEmployee_UTIL = async (email,password) => {
    return (await setPassToEmployee_DAL(email,password)).data;
}

export {getAllEmployees_UTIL,getEmployee_UTIL,addEmployee_UTIL,updateEmployee_UTIL,deleteEmployee_UTIL,setPassToEmployee_UTIL}
