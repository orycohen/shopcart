import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

(async () => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: "/api/user"
    })
        .then(res => {ReactDOM.render(<App user={res.data}/>, document.getElementById('root'))})
        .catch(res => {ReactDOM.render(<App user={{cart: undefined}}/>, document.getElementById('root'))})
})();
