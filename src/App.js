import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import { Container, Col, Row } from 'react-bootstrap';
import StepsComponent from './components/sharedComponents/stepsComponent';
import UserDetailsComponent from './components/userDetails/userDetailsComponent';
import UserPrivacyFormComponent from './components/userDetails/userPrivacyFormComponent';
import UserDetailsFormDoneComponent from './components/userDetails/userDetailFormDoneComponent';

function App() {
  const {pathname} = useHistory() || window?.location;
  const currentLocation = pathname.replace('/', '');

  return (
    <Router forceRefresh={true}>
    <div className="userDetailsApp">
    <Container fluid>
      <Row>
        <Col  md={{ span: 8, offset: 2 }} className="center">
          <h3>Create User Details</h3>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <StepsComponent currentStep={currentLocation} /> 
        </Col>
      </Row>
      <Row>
        <Switch>
            <Route exact path="/">
                <UserDetailsComponent />
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
