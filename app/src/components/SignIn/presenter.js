import React from 'react';
import PropTypes from "prop-types";

const SignIn = (props) => (

    <>
        <h3> SignIn Page </h3>
    <form
        method="POST"
        onSubmit={props.submit_handler}
        >
        <input 
            type = 'email'
            name = 'email'
            placeholder = 'insert id'
            value = {props.account_email}
            onChange = {props.input_hander}
            />

        <input
            type = 'password'
            name = 'password'
            placeholder = 'insert password'    
            value = {props.account_pw}
            onChange = {props.input_hander}
            />

        <input
            type = 'submit'
            value = 'click'
            />
    </form>
            
    </>
);  

SignIn.propTypes = {
	input_hander 	: PropTypes.func.isRequired,
	submit_handler 	: PropTypes.func.isRequired,
	
	account_email 	: PropTypes.string.isRequired,
	account_pw 		: PropTypes.string.isRequired
};


export default SignIn;