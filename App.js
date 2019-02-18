import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, hashHistory} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'popper.js';

import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore({});

import MainPage from './components/main';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter history={hashHistory}>
            <MainPage/>
        </HashRouter>
    </Provider>,
    document.getElementById('container')
);

