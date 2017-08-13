import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './configureStore';
const initialState = {};

const store = configureStore(initialState);

const payloadSingle = { 
  type: 'API_REQUEST', 
  options: {
    method: 'GET',
    url: 'http://ip.jsontest.com/',
    loading: 'loading',
    success: 'success',
    error: 'error'
  }
};

const payloadMulti = { 
  type: 'API_REQUEST_MULTI', 
  options: {
    requests: [
      {
        name: 'data_one',
        method: 'GET',
        url: 'http://ip.jsontest.com/'
      },
      {
        name: 'data_two',
        method: 'POST',
        url: 'http://ip.jsontest.com/'
      }
    ],
    loading: 'loading',
    success: 'success',
    error: 'error'
  }
};


ReactDOM.render(
<div>
   <button onClick={() => store.dispatch(payloadSingle)}>Single Request</button><br />
   <button onClick={() => store.dispatch(payloadMulti)}>Multi Request</button>
</div>
, document.getElementById('app-root'));
