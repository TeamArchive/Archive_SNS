import React from 'react';
import './styles.css';

const Navigation = (props, context) => (
    <>
        <div className='Top-bar'>
                <img className='logo' src="logo.svg" alt='logo'/>

                <input 
                    className='search-input'
                    placeholder='Search'/>

                <div className='action_form'>
                    <button className='action_btn'>Home</button>
                    <button className='action_btn'>Profile</button>
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
        </div>
    </>
)// Top Navigation

export default Navigation;