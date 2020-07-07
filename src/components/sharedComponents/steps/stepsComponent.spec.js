import React from 'react';
import { render, create, cleanup } from '@testing-library/react';
import StepsComponent from './stepsComponent';

const mockStepsList=[
	{stepIndex: 1, cssClass: 'inactive', page: 'user'},
	{stepIndex: 2, cssClass: 'inactive', page: 'privacy'},
	{stepIndex: 3, cssClass: 'inactive', page: 'done'}
];
const renderedHTML = `<ul class="steps"><li class="is-active">user</li><li class="inactive">privacy</li><li class="inactive">done</li></ul>`;

describe('StepComponet', () => {
	afterEach(cleanup);

	it('Should render and match snapshot', () => {
		const { container } = render(<StepsComponent stepsList={mockStepsList} />);

		expect(container).toMatchSnapshot();
	});

	it('Should render list of steps', () => {
		const { container, getByText } = render(<StepsComponent stepsList={mockStepsList} />);

		expect(getByText(/user/)).toBeInTheDocument();
		expect(getByText(/privacy/)).toBeInTheDocument();
		expect(getByText(/done/)).toBeInTheDocument();

		expect(container.innerHTML).toMatch(renderedHTML);
	});
});