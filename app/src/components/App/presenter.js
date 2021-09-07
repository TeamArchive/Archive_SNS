import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";

import Auth from '../Auth';
import Home from '../Home';
<<<<<<< HEAD
import './styles.css';
=======
import Chat from '../Chat';
>>>>>>> develop

const App = props => [
    props.isLoggedIn ? <PrivateRoutes key={1} /> : <PublicRoutes key={1} />,
];

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

//before login
const PrivateRoutes = props => (

<Route>
<<<<<<< HEAD
    <div className="App">
        <Navigation />
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </div>
=======
    <Navigation />
    <h1>a</h1>
    <h1>a</h1>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
    </Switch>
>>>>>>> develop
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
