import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import { withLoader } from '../sharedComponents/withLoader';
import { Col } from 'react-bootstrap';
import HeaderComponent from '../sharedComponents/header/headerComponent';
import UserDetailsFormComponent from './userDetailsFormComponent';
import Notification from '../sharedComponents/notification/notification';
import { fetchFormConfigData } from '../../store/actions/user.action';

const RenderUserDetailsForm = withLoader(UserDetailsFormComponent);

export const UserDetailsContainer = (props) => {
    let history = useHistory();
	const Dispatch = useDispatch();
    const formConfigData = useSelector(state => state?.user?.formConfigData);
    const isApiError = useSelector(state => state?.user?.error);
    const [userData, setUserData] = useState({
        name: '',
        role: '',
        emailAddress: '',
        password: '',
        productUpdate: false,
        otherProductUpdate: false,
        completed: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
         const {name, value} = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFormSubmit = () => {
        const location = {
            pathname: '/privacy',
            state: { userData }
        };
        
        history.push(location); 
    }

    useEffect(() => {
        setIsLoading(true);
		Dispatch(fetchFormConfigData()).then(() => {
            setIsLoading(false);
        });
	}, [Dispatch]);

    return (
        <Col  md={{ span: 6, offset: 3 }}>
            <HeaderComponent title="Create User details" />
            {!_isEmpty(isApiError)
                ? (<Notification type="error" message="Oops! Something went wrong, please refresh your browser" />)
                : ( <RenderUserDetailsForm
                    loading={isLoading}
                    inputFields={formConfigData?.userForm}
                    handleFormSubmit={handleFormSubmit}
                    handleOnChange={handleOnChange}
                />)
            }

        </Col>

    )
};

UserDetailsContainer.defaultProps = {
    isValidationData: {},
    inputFields: [],
    history: {},
};

UserDetailsContainer.propTypes = {
    isValidationData: PropTypes.object.isRequired,
    inputFields: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default UserDetailsContainer;