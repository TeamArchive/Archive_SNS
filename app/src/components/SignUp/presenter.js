import React from 'react';
import PropTypes from 'prop-types';

const MAX_SIGNUP_STAGE = 2

const SignUp = (props) => (

    <>
        <h3> SignUp Page </h3>

        <form
            onSubmit={props.submit_handler}
            >

        { props.current_stage === 1 && (

            <>
                <h5> User form (1/2) </h5>

                <input 
                    type = 'email'
                    name = 'email'
                    placeholder = 'email'
                    value = {props.account_email}
                    onChange = {props.String_input_handler}
                    />

                <input
                    type = 'password'
                    name = 'password'
                    placeholder = 'password'    
                    value = {props.account_pw}
                    onChange = {props.String_input_handler}
                    />
                
                <input
                    type = 'password'
                    name = 'confirm_pw'
                    placeholder = 'confirm password'    
                    value = {props.account_pw}
                    onChange = {props.String_input_handler}
                    />

                <button
                    type='button'
                    value='Continue'
                    onClick={props.next_stage}
                    >
                        next		
                </button>
            </>
        )} 

        { props.current_stage === 2 && (
            <>
                <h5> User form (2/2) </h5>

                <input
                    type = 'text'
                    name = 'name'
                    placeholder = 'alias'    
                    value = {props.account_alias}
                    onChange = {props.String_input_handler}
                    />

                <button
                    type='button'
                    value='back'
                    onClick={props.back_stage}
                    >
                        go back		
                </button>

                <input
                    type='submit'
                    value='Sign up' 
                />

            </>
        )}     

        </form>

        <>
            <br/><br/>
			test_load<br/>
			email : {props.email}<br/>
			pw : {props.password}<br/>
			confirm_pw : {props.confirm_pw}<br/>
			name : {props.name}<br/>
		</>       
            
    </>
);  

SignUp.propTypes = {
	email		            : PropTypes.string.isRequired,
	password			    : PropTypes.string.isRequired,
	confirm_pw	            : PropTypes.string.isRequired,
	name		            : PropTypes.string.isRequired,

    current_stage	        : PropTypes.number.isRequired,
	next_stage			    : PropTypes.func.isRequired,
    back_stage              : PropTypes.func.isRequired,

	String_input_handler	: PropTypes.func.isRequired,
	submit_handler		    : PropTypes.func.isRequired,
};

export { MAX_SIGNUP_STAGE };
export default SignUp;