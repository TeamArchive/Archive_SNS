import React from 'react';
import PropTypes from "prop-types";
import './styles.css';

const SignIn = (props) => (
    <div>
        <form
            className="SignIn-entirety"
            method="POST"
            onSubmit={props.submit_handler}>

            <input 
                className="Auth-input-form"
                type = 'email'
                name = 'email'
                placeholder = 'archive_sns@archive.com'
                value = {props.account_email}
                onChange = {props.input_hander}/>

            <input
                className="Auth-input-form"
                type = 'password'
                name = 'password'
                placeholder = 'password'    
                value = {props.account_pw}
                onChange = {props.input_hander}/>

            <input
                className='submit-btn'
                type = 'submit'
                value = 'Login'/>
        </form>     
    </div>
);  

SignIn.propTypes = {
	input_hander 	: PropTypes.func.isRequired,
	submit_handler 	: PropTypes.func.isRequired,
	
	account_email 	: PropTypes.string.isRequired,
	account_pw 		: PropTypes.string.isRequired
};


export default SignIn;