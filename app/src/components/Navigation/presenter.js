import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";

const Navigation = (props, context) => (
<>
    <div className='Top-bar'>
        <a href="/">
            <img className='logo' src="logo.svg" alt='logo'/>
        </a>

        <div className='action_form'>
            Name :{props.info?.name}<br/>
            Email :{props.info?.email}<br/>
            PK: {props.account?.PK}
            <h3>MENU</h3>
            <button className='action_btn'>Home</button>
            <Link to = "/Profile/PK"> <button className='action_btn'>Profile</button> </Link>
            <button className='action_btn'>Group</button>
        </div> 

        <div className='user_action_form'>
            <button
                className="action_btn"
                type = 'submit'
                onClick = {props.logout_handler}>
                    Logout
            </button>
        </div>

        <button onClick={ props.getProfile_handler}>click</button>
    </div>
</>
)// Top Navigation

export default Navigation;