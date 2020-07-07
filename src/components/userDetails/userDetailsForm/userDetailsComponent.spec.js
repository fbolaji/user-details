import React from 'react';
import { EnzymeAdapter, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import { formConfigData } from '../../../../db.json';
import * as ReactReduxHooks from '../../../store/react-redux-hooks';
import UserDetailsComponent from './userDetailsComponent';
import { withLoader } from '../../HOC/withLoader';
import UserDetailsFormComponent from './userDetailsFormComponent';
import * as types from '../../../store/types/types';
import * as actions from '../../../store/actions/user.action';
import configureMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const RenderUserDetailsForm = withLoader(UserDetailsFormComponent);

describe("UserDetailsComponent", () => {

	let wrapper;
	let useEffect;
	let store;

	const mockUseEffect = () => {
		useEffect.mockImplementationOnce(f => f());
	};

	const userFormData = {
		"userForm": [
			{
				"label": "Name *",
				"id": "name",
				"name": "name",
				"type": "text",
				"placeholder": "Please enter your name",
				"isRequired": true,
				"validator": {
					"isRequired": true,
					"error": "Name is required."
				}
			},
			{
				"label": "Role",
				"id": "role",
				"name": "role",
				"type": "text",
				"placeholder": "Please enter role",
				"isRequired": false,
				"pattern": ""
			},
			{
				"label": "Email *",
				"id": "emailAddress",
				"name": "emailAddress",
				"type": "text",
				"placeholder": "Please enter email address",
				"isRequired": true,
				"pattern": "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[A-Za-z]+$",
				"validator": {
					"isRequired": true,
					"regex": "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[A-Za-z]+$",
					"error": "A valid email address is required."
				}
			},
			{
				"label": "Password *",
				"id": "password",
				"name": "password",
				"type": "password",
				"placeholder": "Please enter password",
				"isRequired": true,
				"pattern": "/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{9,}/",
				"validator": {
					"isRequired": true,
					"regex": "/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{9,}/",
					"error": "Password must be 9 characters long and must contain a lowercase, uppercase and a digit."
				}
			}
		],
		"userPrivacyForm": [
			{
				"checked": false,
				"label": "Recieve updates about Tray.io products by email",
				"id": "productUpdate",
				"name": "productUpdate",
				"type": "checkbox"
			},
			{
				"checked": false,
				"label": "Recieve communication about by email for other products created by Tray.io team",
				"id": "otherProductUpdate",
				"name": "otherProductUpdate",
				"type": "checkbox"
			}
		],
		"userFormValidation": {
			"name": {
				"validator": {
					"isRequired": true,
					"error": "Name is required."
				}
			},
			"email": {
				"validator": {
					"isRequired": true,
					"regex": "\\S+@\\S+\\.\\S+",
					"error": "A valid email address is required."
				}
			},
			"password": {
				"validator": {
					"isRequired": true,
					"regex": "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{10,}$/g",
					"error": "Password must be 9 characters long and must contain a lowercase, uppercase and a digit."
				}
			}
		}
	};

	beforeEach(() => {
		/* mocking store */
		store = configureStore([thunk])({
			formConfigData: [],
			loadingData: false,
			createUserDetails: {},
			error: {}
		});

		/* mocking useEffect */
		useEffect = jest.spyOn(React, "useEffect");
		mockUseEffect(); // 2 times
		mockUseEffect(); //

		/* mocking useSelector on our mock store */
		jest
			.spyOn(ReactReduxHooks, "useSelector")
			.mockImplementation(state => store.getState());
		/* mocking useDispatch on our mock store  */
		jest
			.spyOn(ReactReduxHooks, "useDispatch")
			.mockImplementation(() => store.dispatch);
		/* shallow rendering */
		wrapper = shallow(<UserDetailsComponent store={store} />);
	});

	describe("on mount", () => {
		fetchMock.getOnce('/formConfigData', {
			body: { formConfigData: []},
			headers: { 'content-type': 'application/json' }
		});

		it("dispatch fetchFormConfigData action to store", () => {
			const expectedActions = [
				{ type: types.LOADING, payload: true },
				{ type: types.FETCH_FORMCONFIG_DATA, payload: { ...formConfigData  } },
				{ type: types.LOADING, payload: false }
			]
			const store = mockStore({ formConfigData: {
					...userFormData
				} });
			return store.dispatch(actions.fetchFormConfigData()).then(() => {
				// return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			})

		});
	});
	it("should render User details form components if userForm.length > 0",
		() => {
			const expectedActions = [
				{ type: types.LOADING, payload: true },
				{ type: types.FETCH_FORMCONFIG_DATA, payload: { ...formConfigData  } },
				{ type: types.LOADING, payload: false }
			]
			const store = mockStore({ formConfigData: {
					...userFormData
				} });

			return store.dispatch(actions.fetchFormConfigData()).then(() => {
				// return of async actions
				expect(store.getActions()).toEqual(expectedActions);
				expect(wrapper.find(RenderUserDetailsForm)).toBeTruthy();
				// expect(wrapper.find(RenderUserDetailsForm)).toMatchSnapshot();
			});

		});
});




















































// import React, {useState as useStateMock} from 'react';
// import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import { useDispatch, useSelector, Provider } from 'react-redux';
// import { render } from '@testing-library/react';
// import UserDetailsComponent from './userDetailsComponent';
// import { fetchFormConfigData } from '../../store/actions/user.action';
//
// import * as mockFormConfigData from '../../../db.json';
// import rootReducer from '../../store/reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
//
// const appReducer = combineReducers({
// 	rootReducer
// });
//
// const composeEnhancers = compose;
//
// const mockStore = createStore(
// 	appReducer,
// 	composeWithDevTools(composeEnhancers(applyMiddleware(thunk)))
// );
//
// jest.mock("react-redux", () => ({
// 	...jest.requireActual("react-redux"),
// 	useSelector: jest.fn()
// }));
//
// describe("UserDetailsComponent", () => {
// 	beforeEach(() => {
// 		useSelector.mockImplementation(callback => {
// 			return callback(mockFormConfigData);
// 		});
// 	});
//
// 	afterEach(() => {
// 		useSelector.mockClear();
// 	});
//
// 	it("should render user form", () => {
// 		const mockDispatch = jest.fn(
// 			new Promise((resolve, reject) => {
// 				resolve({
// 					user: mockFormConfigData
// 				})
// 			})
// 		);
//
// 		const { container, getByTestId } = render(<Provider store={mockStore}><UserDetailsComponent /></Provider>);
//
// 		const mockFetchConfigData = fetchFormConfigData();
//
//
// 		const mockLoading = jest.fn();
// 		const mockSelector = jest.fn();
// 		const formMockConfigData = {
// 			user: mockFormConfigData
// 		};
//
// 		mockFetchConfigData(() => mockLoading);
// 		useSelector.mockImplementation(callback => {
// 			return callback(mockFormConfigData);
// 		});
//
// 		expect(mockDispatch.call.length).toBeTruthy();
// 		expect(container).toMatchSnapshot();
// 	});
// });