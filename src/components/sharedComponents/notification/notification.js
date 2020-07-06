import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ type, message }) => {
	if (!message) {
		return;
	}
	return (
		<div className={ type ? `notification ${type}` : ''}>
			<p dangerouslySetInnerHTML={ { __html: message } }></p>
		</div>
	);
};

Notification.defaultProps = {
	type: '',
	message: '',
}

Notification.propTypes = {
	type: PropTypes.string,
	message: PropTypes.string,
}

export default Notification;
