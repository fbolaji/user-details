import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import PrivacyConsentForm from './privacyConsentForm';

import MutationObserver from 'mutation-observer';

let targetNode = document.getElementById('root');
let config = { attributes: true, childList: true, subtree: true, characterData:true };
const observer = new MutationObserver(function() {
	observer.disconnect();
});

describe("PrivacyConsentForm", () =>{
	it("should render form elements if data is > 0", () => {
		const userPrivacyForm = [
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
		];

		const { container, getByText, getByTestId } = render(<PrivacyConsentForm
			userPrivacyForm={userPrivacyForm}
		/>);
		const testid = getByTestId('userPrivacyForm_testid');
		expect(testid).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});