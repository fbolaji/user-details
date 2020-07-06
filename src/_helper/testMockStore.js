import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import rootReducer from '../store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
	rootReducer
});

const composeEnhancers = compose;

export const mockStore = createStore(
	appReducer,
	composeWithDevTools(composeEnhancers(applyMiddleware(thunk)))
);