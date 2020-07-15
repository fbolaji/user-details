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
            <Route exact path="/" render={() => <Redirect to="/user" /> } />
            <Route
                exact
                path="/user"
                render={() => <UserDetailsComponent key="user" />}
            />
            <Route
                exact
                path="/privacy"
                render={() => <UserPrivacyFormComponent key="privacy" /> }

            />
            <Route
                exact
                path="/done"
                render={() => <UserDetailsFormDoneComponent key="done" /> }
            />
        </Switch>
      </Row>

    </Container>
    </div>
    </Router>
  );
}

export default App;
