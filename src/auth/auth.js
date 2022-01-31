import {login_DAL,logout_DAL,getTokenWithRefreshToken_DAL} from "../DAL/auth";
import appStore from "../redux/store";


const login = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await login_DAL(email,password);
            sessionStorage.setItem("r-TOK",response.data.refreshToken);
            resolve(response.data.employee);
        } catch (err) {
            reject(err)
        }
    });
}

const logout = async () => {
    return new Promise(async (resolve,reject) => {
        try {
            await logout_DAL()
            sessionStorage.removeItem("r-TOK");
            appStore.dispatch({type:"LOGOUT",payload:""});

            resolve();
        } catch (err) {
            reject(err);
        }
    });
}


const getTokenWithRefreshToken = async (refreshToken) => {
    return await getTokenWithRefreshToken_DAL(refreshToken).data;
}


export {login,logout,getTokenWithRefreshToken}
