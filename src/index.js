import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = compose;
export const store = createStore(
    rootReducer,
    composeWithDevTools(composeEnhancers(applyMiddleware(thunk)))
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);