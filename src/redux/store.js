import reducer from "./reducer"
import {createStore } from "redux";

// redux store, 


const appStore = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // chrome [redux developer tools] extension, now able to chekc redux values on run


export default appStore;    