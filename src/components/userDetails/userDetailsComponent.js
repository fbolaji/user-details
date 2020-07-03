import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withLoader } from '../sharedComponents/withLoader';
import { Col } from 'react-bootstrap';
import UserDetailsFormComponent from './userDetailsFormComponent';
import { fetchFormConfigData } from '../../store/actions/user.action';

const RenderUserDetailsForm = withLoader(UserDetailsFormComponent);

export const UserDetailsContainer = (props) => {
    let history = useHistory();
	const _dispatch = useDispatch();
    const formConfigData = useSelector(state => state?.user?.formConfigData);
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
		_dispatch(fetchFormConfigData()).then(() => {
            setIsLoading(false);
        });
	}, [_dispatch]);

    return (
        <Col  md={{ span: 8, offset: 2 }}> 
            <RenderUserDetailsForm 
                loading={isLoading}
                inputFields={formConfigData.userForm}
                handleFormSubmit={handleFormSubmit}
                handleOnChange={handleOnChange}
            />
        </Col>

    )
};

UserDetailsContainer.defaultProps = {
    isValidationData: {},
    inputFields: [],
    history: {},
    fetchFormConfigData: () => {},   
};

UserDetailsContainer.propTypes = {
    isValidationData: PropTypes.object.isRequired,
    inputFields: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    fetchFormConfigData: PropTypes.func.isRequired,
};

export default UserDetailsContainer;