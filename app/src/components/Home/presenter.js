import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Post from "../Post";

const Home = (props) => (

    <Router>
        <h1> Home Page </h1>

        <input
            type = 'submit'
            value = 'logout'
            onClick = {props.logout_handler}
            /><br/>

        <h1>
            User
        </h1>

        <input
            type="submit"
            value="click"
            onClick={props.User_hanlder}
            />
        
        <Post />

    </Router>
);  



export default Home;