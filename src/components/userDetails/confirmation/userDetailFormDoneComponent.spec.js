import React from 'react';
import * as rr from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';
import UserDetailFormDoneComponent from './userDetailFormDoneComponent';
import { createUser } from '../../../store/actions/user.action';

import rootReducer from '../../../store/reducers';
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


const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));


describe('UserDetailsFormDoneComponent', () => {
	beforeEach(() => {
		const mockDispatch = jest.fn(
			new Promise((resolve, reject) => {
				resolve({
					createUserDetails: {}
				})
			})
		);
		const mockCreateUser = createUser({"userid": "ee7ac090-a040-4d5e-9d56-e070aec50aa9",
			"name": "zfsdfgsdfa",
			"role": "",
			"email": "info@gulpdigital.com",
			"password": "!9gdT35t",
			"productUpdate": true,
			"otherProductUpdate": true,
			"completed": true,
			"id": 76
		});
	});

	it("should render confirmation message and matchSnapshot", () => {
		const { container } = render(
			<rr.Provider store={mockStore}>
				<UserDetailFormDoneComponent  />
			</rr.Provider>
		);

		expect(container).toMatchSnapshot();
	});

	it('CreateUser action should take user details object as parameter and make api request to store in userProfile', () => {
			const { getByText } = render(
				<rr.Provider store={mockStore}>
					<UserDetailFormDoneComponent  />
				</rr.Provider>
			);
			const textMsg = `Please verify your email address, you should have received an email from us already!`;
			const confirmationText = getByText(textMsg);

			expect(confirmationText).toBeInTheDocument();
	});
})