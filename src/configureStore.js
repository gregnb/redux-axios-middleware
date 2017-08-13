import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMiddleware from './apiMiddleware';

function reducer() {
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware))
  );
  return store;
}


