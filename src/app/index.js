import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "./app";
import AppOld from './app copy';

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
        {/*<AppOld />*/}
    </BrowserRouter>
    , document.getElementById('app')
);