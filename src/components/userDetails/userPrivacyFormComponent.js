import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Button } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { fetchFormConfigData } from '../../store/actions/user.action';

export const UserPrivacyFormComponent = () => {
    let history = useHistory();
    const { userData } = history?.location?.state;
    const _dispatch = useDispatch();
    const userPrivacyForm = useSelector(state => state?.user?.formConfigData?.userPrivacyForm);
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
        const location = {
            pathname: '/done',
            state: { userData, userPrivacyData }
          };

          history.push(location);
    };

    useEffect(() => {
        _dispatch(fetchFormConfigData());
    }, [_dispatch]);

    return (
        <Col  md={{ span: 8, offset: 2 }}>
            <Form name="userPrivacyForm" onSubmit={handleFormSubmit}>
                {userPrivacyForm?.map(inputField => 
                    <FormGroup key={inputField.id}>
                        <FormCheckInput 
                            type={inputField.type} 
                            name={inputField.name} 
                            id={inputField.id}
                            onChange={handleOnChange}
                        />
                        <FormCheckLabel htmlFor={inputField.name}>{inputField.label}</FormCheckLabel>
                    </FormGroup>
                    )}
                
               
                <FormGroup>
                    <Button variant="secondary" type="button" onClick={() => history.push('/user')}>Back</Button>
                    <Button type="submit">Submit</Button>
                </FormGroup> 
            </Form>
        </Col>
    )
};

UserPrivacyFormComponent.defaultProps = {
    productUpdate: '',
    otherProductUpdate: '',
    history: {},
    fetchFormConfigData: () => {},
};

UserPrivacyFormComponent.propTypes = {
    productUpdate: PropTypes.string,
    otherProductUpdate: PropTypes.string,
    history: PropTypes.object.isRequired,
    fetchFormConfigData: PropTypes.func.isRequired,
};

export default UserPrivacyFormComponent;