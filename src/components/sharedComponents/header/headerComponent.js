import React from 'react';
import PropTypes from 'prop-types';

const HeaderComponent = ({title}) => {
	return (
		<header>
			<h2>{title}</h2>
		</header>
	);
};

HeaderComponent.defaultProps = {
	title: '',
};

HeaderComponent.propTypes = {
	title: PropTypes.string,
}

export default HeaderComponent;

