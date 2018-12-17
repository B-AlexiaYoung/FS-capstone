import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import  './index.css'; // apply globally
import App from './components/App';
import reduxThunk from 'redux-thunk';

// note proxies added to client package.json the routes auth/google and api/* target : localhost5000
//const store = createStore(reduers, {}, applyMiddleware());
const store = createStore(()=> reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
<Provider store ={store}><App /></Provider>,
 document.querySelector('#root')
 );