import React, {useState as useStateMock} from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { render } from '@testing-library/react';
import UserDetailsComponent from './userDetailsComponent';
import { fetchFormConfigData } from '../../store/actions/user.action';

import * as mockFormConfigData from '../../../db.json';
import rootReducer from '../../store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
	rootReducer
});

const composeEnhancers = compose;

const mockStore = createStore(
	appReducer,
	composeWithDevTools(composeEnhancers(applyMiddleware(thunk)))
);

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useSelector: jest.fn()
}));

describe("UserDetailsComponent", () => {
	beforeEach(() => {
		useSelector.mockImplementation(callback => {
			return callback(mockFormConfigData);
		});
	});

	afterEach(() => {
		useSelector.mockClear();
	});

	it("should render user form", () => {
		const mockDispatch = jest.fn(
			new Promise((resolve, reject) => {
				resolve({
					user: mockFormConfigData
				})
			})
		);

		const { container, getByTestId } = render(<Provider store={mockStore}><UserDetailsComponent /></Provider>);

		const mockFetchConfigData = fetchFormConfigData();


		const mockLoading = jest.fn();
		const mockSelector = jest.fn();
		const formMockConfigData = {
			user: mockFormConfigData
		};

		mockFetchConfigData(() => mockLoading);
		useSelector.mockImplementation(callback => {
			return callback(mockFormConfigData);
		});

		expect(mockDispatch.call.length).toBeTruthy();
		expect(container).toMatchSnapshot();
	});
});