import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MAX_SIGNUP_STAGE = 2

const SignUp = (props) => (
    <React.Fragment>
        <form
            className='SignIn-entirety'
            onSubmit={props.submit_handler}>

        { props.current_stage === 1 && (
            <React.Fragment>
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
                <input
                    className="Auth-input-form" 
                    type = 'text'
                    name = 'name'
                    placeholder = 'alias'    
                    value = {props.account_alias}
                    onChange = {props.String_input_handler}/>

                    <span>프로필 이미지 선택</span>
                    <span style={{fontSize:"0.8rem"}} className="guide-text">(최적화 된 이미지는 1:1비율 입니다.)</span>
                    <div className="ImgPreview">
                        <img className="ImgPreview2" src={props.account_img_preview} />
                    </div>

                    <input
                        className="file_upload-btn"
                        type="file"
                        accept='image/jpg, impge/png, image/jpeg, image/gif'
                        name="images" 
                        value={props.account_img}
                        onChange={props.img_input_handler} />
	
                <button
                    type='button'
                    className="submit-btn"
                    value='back'
                    onClick={props.back_stage}>
                        go back		
                </button>

                <input
                    className="submit-btn"
                    type='submit'
                    value='Sign up'/>
            </React.Fragment>
        )}     
        </form>    
    </React.Fragment>
);  

SignUp.propTypes = {


    current_stage	        : PropTypes.number.isRequired,
	next_stage			    : PropTypes.func.isRequired,
    back_stage              : PropTypes.func.isRequired,

    img_input_handler	    : PropTypes.func.isRequired,
	String_input_handler	: PropTypes.func.isRequired,
	submit_handler		    : PropTypes.func.isRequired,
};

export { MAX_SIGNUP_STAGE };
export default SignUp;