import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import UserDetailsFormComponent from './userDetailsFormComponent';

import MutationObserver from 'mutation-observer';

let targetNode = document.getElementById('root');
let config = { attributes: true, childList: true, subtree: true, characterData:true };
const observer = new MutationObserver(function() {
	observer.disconnect();
});


describe("UserDetailsFormComponent", () =>{
	it("should render form elements if data is > 0", () => {
		const inputFields = [
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
			}];
		const { container, getByText, getByTestId } = render(<UserDetailsFormComponent
			inputFields={inputFields}
		/>);
		const testid = getByTestId('userDetail_testid');
		expect(testid).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it("requires fields with valid inputs", async () => {
		const handleFormSubmit = jest.fn();
		const handleOnChange = jest.fn();
		const inputFields = [
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
}];
		const { container, getByLabelText, getByRole } = render(<UserDetailsFormComponent
			inputFields={inputFields}
			handleFormSubmit={handleFormSubmit}
			handleOnChange={handleOnChange}
		/>);
		const nameTarget = {target: {value: "Francis"}};
		const emailTarget = {target: {value: "test@test.com"}};
		const pwdTarget = {target: {value: "test@test.com"}};

		await act(async () => {
			fireEvent.change(getByLabelText("Name *"), nameTarget);
			fireEvent.change(getByLabelText("Email *"), emailTarget);
			fireEvent.change(getByLabelText("Password *"), pwdTarget);
		});
		await act(async () => {
			fireEvent.click(getByRole("button"));
		});

		expect(handleFormSubmit.call).toBeTruthy();
	})
});
