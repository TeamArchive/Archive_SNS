import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Auth from '../Auth';
import SignUp from '../SignUp';

const App = props => [
    // props.isLoggedIn ? <PublicRoutes key={1} /> : <PublicRoutes key={1} />,
    // props.isLoggedIn ? <PrivateRoutes key={1} /> : <PrivateRoutes key={1} />,
    props.isLoggedIn ? <PublicRoutes key={1} /> : <PrivateRoutes key={1} />,
];

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

//before login
const PrivateRoutes = props => (

<Route>
    <Switch>
        
    </Switch>
</Route>
);


//after login
const PublicRoutes = props => (
<Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/signUp" component={SignUp} />
</Switch>
);

export default App;
