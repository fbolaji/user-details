import React, { useEffect, useState, useCallback } from 'react';
import { uuid } from 'uuidv4';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import { Col } from 'react-bootstrap';
import { createUser } from '../../../store/actions/user.action';
import { withLoader } from '../../HOC/withLoader';
import HeaderComponent from '../../sharedComponents/header/headerComponent';
import Notification from '../../sharedComponents/notification/notification';

const ConfirmationMessage = withLoader(() =>
        <p className="confirmation-text">
            Please verify your email address, you should have
            received an email from us already!
        </p>
    );

export const UserDetailsFormDoneComponent = () => {
    let history = useHistory();
    const Dispatch = useDispatch();
    const isApiError = useSelector(state => state?.user?.error);
    const [isLoading, setIsLoading] = useState(false);

    const _mergeData = {
        userid: uuid(),
        ...history?.location?.state?.userData,
        ...history?.location?.state?.userPrivacyData,
        completed: true
    };

    const postUserDetails = useCallback(() => {
        setIsLoading(true);
        Dispatch(createUser(_mergeData)).then(() => {
            console.log({userProfileDetails: _mergeData});
            setIsLoading(false);
        });
    }, [Dispatch, _mergeData]);

    useEffect(() => {
        if (_isEmpty(history?.location?.state?.userData)) {
            history.push('/user');
            return;
        }
        postUserDetails();
    }, [history]);


    return (
        <Col md={{ span: 6, offset: 3}}>
            <HeaderComponent title="User details completed." />
            {!_isEmpty(isApiError)
                ? (<Notification type="error" message="Oops! Something went wrong.. <a href='/user'>start again</a>" />)
                : (<ConfirmationMessage loading={isLoading} />)
            }
        </Col>
    )
};

export default UserDetailsFormDoneComponent;