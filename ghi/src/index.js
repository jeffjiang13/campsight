import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./app/store";


const body = document.getElementsByTagName('body')[0];
const root = ReactDOM.createRoot(body);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
