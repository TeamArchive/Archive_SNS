import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MAX_SIGNUP_STAGE = 2

const SignUp = (props) => (
    <React.Fragment>
        <h3> SignUp </h3>

        <form
            className='signIn-form'
            onSubmit={props.submit_handler}>

        { props.current_stage === 1 && (
            <React.Fragment>
                <h5> User form (1/2) </h5>

                <input 
                    className="Auth-input-form"
                    type = 'email'
                    name = 'email'
                    placeholder = 'email'
                    value = {props.account_email}
                    onChange = {props.String_input_handler}/>

                <input
                    className="Auth-input-form"
                    type = 'password'
                    name = 'password'
                    placeholder = 'password'    
                    value = {props.account_pw}
                    onChange = {props.String_input_handler}/>
                
                <input
                    className="Auth-input-form"
                    type = 'password'
                    name = 'confirm_pw'
                    placeholder = 'confirm password'    
                    value = {props.account_confirm_pw}
                    onChange = {props.String_input_handler}/>

                <button
                    className="submit-btn"
                    type='button'
                    value='Continue'
                    onClick={props.next_stage}>
                        next		
                </button>
            </React.Fragment>
        )} 

        { props.current_stage === 2 && (
            <React.Fragment>
                <h5> User form (2/2) </h5>

                <input
                    className="input-form" 
                    type = 'text'
                    name = 'name'
                    placeholder = 'alias'    
                    value = {props.account_alias}
                    onChange = {props.String_input_handler}/>

                <div
                    className="ImgUploaderFrom">

                    <div className="ImgPreview">
                        test:
                        <img src={props.account_img_preview} alt='preview_img' />
                    </div>

                    <input
                        type="file"
                        accept='image/jpg, impge/png, image/jpeg, image/gif'
                        name="img" 
                        value={props.account_img}
                        onChange={props.img_input_handler} />
				</div>

                <button
                    type='button'
                    value='back'
                    onClick={props.back_stage}>
                        go back		
                </button>

                <input
                    type='submit'
                    value='Sign up'/>
            </React.Fragment>
        )}     
        </form>    
    </React.Fragment>
);  

SignUp.propTypes = {
	account_email		    : PropTypes.string.isRequired,
	account_pw			    : PropTypes.string.isRequired,
	account_confirm_pw	    : PropTypes.string.isRequired,
	account_alias		    : PropTypes.string.isRequired,
    account_img             : PropTypes.string.isRequired,

    current_stage	        : PropTypes.number.isRequired,
	next_stage			    : PropTypes.func.isRequired,
    back_stage              : PropTypes.func.isRequired,

    img_input_handler	    : PropTypes.func.isRequired,
	String_input_handler	: PropTypes.func.isRequired,
	submit_handler		    : PropTypes.func.isRequired,
};

export { MAX_SIGNUP_STAGE };
export default SignUp;