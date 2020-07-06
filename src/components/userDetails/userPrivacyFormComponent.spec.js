import React from 'react';
import { render } from '@testing-library/react';
import UserPrivacyFormComponent from './userPrivacyFormComponent';

describe('UserPrivacyFormComponent', () => {
	it.todo('should render checkboxes and matchSnapshot', () => {
		const { container } = render(<UserPrivacyFormComponent />);

		expect(container).toMatchSnapshot();

	});
	it.todo('Should change value on click of checkbox', () => {
		const { getByText } = render(<UserPrivacyFormComponent />);
	});
});