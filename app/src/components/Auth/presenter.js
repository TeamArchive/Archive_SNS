import React from 'react';
import PropTypes from "prop-types";
import './styles.css';
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Modal from "../Modals/modal";

const Auth = (props) => (
    <div className="Auth-entirety">
        <div className="Auth-left">
            <div className="box-form">
                <div className="Auth-Logo-form">
                    <img className="logo" alt="logo" src="logo.jpg" />
                    <h1 className="Auth-title-banner"> ARCHIVE SNS </h1>
                </div>
                <SignIn /><br/>
                <button 
                    className="Auth-guide-form" 
                    onClick={ props.openModal }>
                        처음이신가요? <br/>
                        그럼 저를 클릭하셔서 회원가입을 완료해보세요!
                </button>

                <Modal 
                    open={ props.modalOpen } 
                    close={ props.closeModal } 
                    header="Create an account">
                        <SignUp />
                </Modal>
            </div>
        </div>
            <img className="Auth-body-banner" alt="logo" src="img/software-developer.jpg" />                    
    </div>
);  

Auth.propTypes = {
	modalOpen   	: PropTypes.func.isRequired,
    openModal		: PropTypes.func.isRequired,
};

export default Auth;