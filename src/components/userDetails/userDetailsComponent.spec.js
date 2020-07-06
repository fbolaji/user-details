import React, {useState as useStateMock} from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import * as rr from 'react-redux';
import { render } from '@testing-library/react';
import UserDetailsComponent from './userDetailsComponent';
import { fetchFormConfigData } from '../../store/actions/user.action';

import * as mockFormConfigData from '../../../db.json';
import rootReducer from '../../store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const INITIATE_STATE = {
	formConfigData: mockFormConfigData,
	loadingData: false,
	createUserDetails: {},
	error: {},
};
const appReducer = combineReducers({
	rootReducer
});

const composeEnhancers = compose;

const mockStore = createStore(
	appReducer,
	composeWithDevTools(composeEnhancers(applyMiddleware(thunk)))
);

 // jest.mock("react-redux", () => ({
 // 	...jest.requireActual("react-redux"),
 // 	...jest.requireActual("react-router-dom"),
 // 	useSelector: jest.fn(() => mockFormConfigData),
 // 	useStateMock: jest.fn()
 // }));

describe("UserDetailsComponent", () => {
	// afterEach(() => {
	// 	useSelector.mockClear();
	// 	useDispatch.mockClear();
	// });
	it("should render user form", () => {
		// const mockSelector = jest.mock.useSelector;
		const mockDispatch = jest.fn(
			new Promise((resolve, reject) => {
				resolve({
					user: mockFormConfigData
				})
			})
		);

		// const { result } = renderHook(() =>
		// 	UserDetailsComponent(mockDispatch)
		// )
		//expect(result.current.isLoading).toEqual(true)

		//const mockDispatch = jest.fn();
		//jest.spyOn(rr, "useDispatch").mockImplementation(() => mockDispatch);

		const mockFetchConfigData = fetchFormConfigData();
		const { container } = render(<rr.Provider store={mockStore}><UserDetailsComponent /></rr.Provider>);
		//expect(mockDispatch).toHaveBeenCalledTimes(1);
		//expect(container).toMatchSnapshot();
		expect(mockDispatch.call).toBeTruthy();
		expect(container).toMatchSnapshot();
	});
});