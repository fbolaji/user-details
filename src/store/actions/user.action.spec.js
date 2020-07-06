import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './user.action';
import * as types from '../types/types';
import fetchMock from 'fetch-mock';
import { render } from '@testing-library/react';
import { uuid } from 'uuidv4';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user.actions', () => {
	const formConfigData = {
		"userForm": [
			{
				"label": "name",
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
				"label": "Email",
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
				"label": "Password",
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

	const { userForm } = formConfigData;
	afterEach(() => {
		fetchMock.restore()
	})

	it('FETCH_FORMCONFIG_DATA when fetchformConfigdata action is dispatched', () => {
		fetchMock.getOnce('/formConfigData', {
			body: { formConfigData: []},
			headers: { 'content-type': 'application/json' }
		})

		const expectedActions = [
			{ type: types.LOADING, payload: true },
			{ type: types.FETCH_FORMCONFIG_DATA, payload: { ...formConfigData  } },
			{ type: types.LOADING, payload: false }
		]
		const store = mockStore({ formConfigData: [] })

		return store.dispatch(actions.fetchFormConfigData()).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		})
	});

	it('CREATE_USER_DETAILS when create action is dispatched', () => {
		fetchMock.getOnce('/userProfile', {
			body: { usersProfile: []},
			headers: { 'content-type': 'application/json' }
		})
		const idNum = uuid();
		const expectedActions = { type: types.CREATE_USER_DETAILS, payload: {
				"userid": "ee7ac090-a040-4d5e-9d56-e070aec50aa9",
				"name": "zfsdfgsdfa",
				"role": "",
				"email": "info@gulpdigital.com",
				"password": "!9gdT35t",
				"productUpdate": true,
				"otherProductUpdate": true,
				"completed": true,
				"id": 75
			}};

		const store = mockStore({ createUserDetails: {}})

		return store.dispatch(actions.createUser({"userid": "ee7ac090-a040-4d5e-9d56-e070aec50aa9",
			"name": "zfsdfgsdfa",
			"role": "",
			"email": "info@gulpdigital.com",
			"password": "!9gdT35t",
			"productUpdate": true,
			"otherProductUpdate": true,
			"completed": true,
			"id": 75
		})).then(() => {
			// return of async actions
			expect(store.getActions()[1]).toEqual(expectedActions);
		})
	})
})