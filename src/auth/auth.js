import {login_DAL,logout_DAL,getTokenWithRefreshToken_DAL} from "../DAL/auth";
import appStore from "../redux/store";

// logging user in, setting the refresh token in session storage
const login = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await login_DAL(email,password);
            sessionStorage.setItem("r-TOK",response.data.refreshToken);
            resolve(response.data.employee); // returning employee
        } catch (err) {
            reject(err)
        }
    });
}

// deleting redux user (logout) and removing refresh token
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

// refreshing JWT with refresh token
const getTokenWithRefreshToken = async (refreshToken) => {
    return await getTokenWithRefreshToken_DAL(refreshToken).data;
}


export {login,logout,getTokenWithRefreshToken}
