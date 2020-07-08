import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom';

import './App.css';
import { Container, Col, Row } from 'react-bootstrap';
import StepsComponent from './components/sharedComponents/steps/stepsComponent';
import UserDetailsComponent from './components/userDetails/userDetailsForm/userDetailsComponent';
import UserPrivacyFormComponent from './components/userDetails/privacy/userPrivacyFormComponent';
import UserDetailsFormDoneComponent from './components/userDetails/confirmation/userDetailFormDoneComponent';

function App() {
  const {pathname} = useHistory() || window?.location;
  const currentLocation = pathname.replace('/', '');

  return (
    <Router forceRefresh={true}>
    <div className="userDetailsApp">
    <Container fluid>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <StepsComponent
              stepsList={[
                {stepIndex: 0, cssClass: 'inactive', page: 'user'},
                {stepIndex: 1, cssClass: 'inactive', page: 'privacy'},
                {stepIndex: 2, cssClass: 'inactive', page: 'done'}
            ]}
              currentStep={currentLocation} />
        </Col>
      </Row>
      <Row>
        <Switch>
            <Route exact path="/">
                <Redirect to="/user" />
            </Route>
            <Route exact path="/user">
              <UserDetailsComponent />
            </Route>
            <Route exact path="/privacy">
                <UserPrivacyFormComponent />
            </Route>
            <Route exact path="/done">
                <UserDetailsFormDoneComponent />
            </Route>
        </Switch>
      </Row>

    </Container>
    </div>
    </Router>
  );
}

export default App;
