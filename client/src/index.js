import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import App from './App'
import './index.css'
import thunk from 'redux-thunk';
import reducers from './reducers'


const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);