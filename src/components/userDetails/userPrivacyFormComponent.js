import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import { Col } from 'react-bootstrap';
import { fetchFormConfigData } from '../../store/actions/user.action';
import { withLoader } from '../sharedComponents/withLoader';
import HeaderComponent from '../sharedComponents/header/headerComponent';
import PrivacyConsentForm from './privacyConsentForm';
import Notification from '../sharedComponents/notification/notification';

const RenderPrivacyConsentForm = withLoader(PrivacyConsentForm);

export const UserPrivacyFormComponent = () => {
    let history = useHistory();
    const Dispatch = useDispatch();
    const userPrivacyForm = useSelector(state => state?.user?.formConfigData?.userPrivacyForm);
    const isApiError = useSelector(state => state?.user?.error);
    const [isLoading, setIsLoading] = useState(true);
    const [userPrivacyData, setUserPrivacyData] = useState({
        productUpdate: '',
        otherProductUpdate: ''
    });

    const handleOnChange = (e) => {
        const {name, checked} = e.target;

        setUserPrivacyData({
            ...userPrivacyData,
            [name]: checked
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { userData } = history?.location?.state;
        const location = {
            pathname: '/done',
            state: { userData, userPrivacyData }
          };

          history.push(location);
    };

    useEffect(() => {
        if (_isEmpty(history?.location?.state)) {
            history.push('/user');
        }
        Dispatch(fetchFormConfigData()).then(() => {
            setIsLoading(false);
        });
    }, [Dispatch, history]);

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <HeaderComponent title="Privacy consent" />
            {!_isEmpty(isApiError)
                ? (<Notification type="error" message="Oops! Something went wrong.. <a href='/user'>start again</a>" />)
                : (<RenderPrivacyConsentForm
                    loading={isLoading}
                    userPrivacyForm={userPrivacyForm}
                    handleFormSubmit={handleFormSubmit}
                    handleOnChange={handleOnChange}
                />)
            }

        </Col>
    )
};

UserPrivacyFormComponent.defaultProps = {
    title: '',
    productUpdate: '',
    otherProductUpdate: '',
    history: {},
};

UserPrivacyFormComponent.propTypes = {
    title: PropTypes.string,
    productUpdate: PropTypes.string,
    otherProductUpdate: PropTypes.string,
    history: PropTypes.object.isRequired,
};

export default UserPrivacyFormComponent;