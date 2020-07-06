import React from 'react';
import { render, cleanup } from '@testing-library/react';
import withLoader from './withLoader';

const MockApp = () => {
	return (
			<div>
				Component loaded
			</div>
		);
};

const MockWithHOC = withLoader(MockApp);

describe('withLoader', () => {
	afterEach(cleanup);

	it('should take component with props and if loading is true show spinnng icon while loading', () => {
		const { container } = render(<MockWithHOC loading={true} />);

		expect(container).toMatchSnapshot();
	});

	it('should take component with props and if loading is false return component', () => {
		const { container, getByText } = render(<MockWithHOC loading={false} />);

		expect(getByText(/Component loaded/i)).toBeInTheDocument();
		//expect(container.innerHTML).toMatch("Component loaded")
	});
});