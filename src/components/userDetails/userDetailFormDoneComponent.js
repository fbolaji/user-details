import React, { useEffect } from 'react';
import { uuid } from 'uuidv4';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { createUser } from '../../store/actions/user.action';

export const UserDetailsFormDoneComponent = () => {
    let history = useHistory();
    const _dispatch = useDispatch();
    const {userData, userPrivacyData} = history?.location?.state;

    const postUserDetails = () => {
        const _mergeData = {
            userid: uuid(), 
            ...userData,
            ...userPrivacyData, 
            completed: true
        };
       
        _dispatch(createUser(_mergeData));
    };

    useEffect(() => {
        postUserDetails();
    }, []);

    return (
        <Col md={{ span: 8, offset: 2}}>
            <p className="primary">Please verify your email address, you should have received an email from us already!</p>
        </Col>
    )
};

export default UserDetailsFormDoneComponent;