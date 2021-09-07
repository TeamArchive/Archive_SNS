import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";

import Auth from '../Auth';
import Home from '../Home';
import './styles.css';

const App = props => [
    props.isLoggedIn ? <PrivateRoutes key={1} /> : <PublicRoutes key={1} />,
];

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

//before login
const PrivateRoutes = props => (

<Route>
    <div className="App">
        <Navigation />
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </div>
</Route>
);

//after login
const PublicRoutes = props => (
<Route>
    <Switch>
        <Route exact path="/" component={Auth} />
    </Switch>   
</Route>
);

export default App;
