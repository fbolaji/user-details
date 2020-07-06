import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormCheck } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

export  const PrivacyConsentForm = ({ userPrivacyForm, handleOnChange, handleFormSubmit }) => {
	let history = useHistory();
	return (
		<>
		<Form name="userPrivacyForm" onSubmit={handleFormSubmit}>
			{userPrivacyForm?.map(inputField =>
				<FormCheck key={inputField.id}>
					<FormCheckInput
						type={inputField.type}
						name={inputField.name}
						id={inputField.id}
						onChange={handleOnChange}
					/>
					<FormCheckLabel htmlFor={inputField.name}>{inputField.label}</FormCheckLabel>
				</FormCheck>
			)}

			<div className="pt-4">
				<Button variant="secondary" type="button" onClick={() => history.push('/user')}>Back</Button>
				<Button className="float-right" type="submit">Submit</Button>
			</div>
		</Form>
		</>
	)
};

PrivacyConsentForm.defaultProps = {
	userPrivacyForm: [],
}

PrivacyConsentForm.propTypes = {
	userPrivacyForm: PropTypes.array.isRequired,
}

export default PrivacyConsentForm;