import axios from "axios";
import {logout} from "../auth/auth"
let path = "http://localhost:8000"


// every response that fall outside 2xx codes, will enter this function
// if the reason of the error is expired access token, this function will try to get a new token with the access token and send the req back to te client
const errorResponse = async (res) => {

  if(res.response?.data?.message == "jwt expired") { // the reason of the error is the access token expired
        // asking for a new access token

        console.log("token expired, asking for a new one");

        let rTok = sessionStorage.getItem("r-TOK");
        try { 
          await axios.post(`${path}/auth/refresh`,{refreshToken:rTok},{withCredentials:true});
          console.log("got new access token, trying to access data again . . .");

           return await axios(res.config);

      } catch (err) {        
          alert("session is over");
          await logout();
          window.location.replace("/");
        }
    }

  return res
}
    

  export default errorResponse