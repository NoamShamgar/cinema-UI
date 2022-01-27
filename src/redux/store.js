import reducer from "./reducer"
import {createStore } from "redux";


const appStore = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default appStore;    