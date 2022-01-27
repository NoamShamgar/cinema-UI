import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import appStore from "./redux/store"

ReactDOM.render(
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter> ,
     document.getElementById('root')
);


