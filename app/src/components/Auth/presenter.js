import React from 'react';
import './styles.css';
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const Auth = (props) => (

    <div className="Auth-entirety">
        <div className="Auth-left">
            <div className="Auth-Logo-form">
                <img className="logo" alt="logo" src="logo.jpg" />
                <h1 className="Auth-title-banner"> ARCHIVE SNS </h1>
            </div>
            <div className="box-form">
                <SignIn />
                <SignUp />
                <span className="Auth-guide-form">처음이신가요? 그럼 회원가입을 먼저 해보세요!</span>
            </div>
        </div>
            <img className="Auth-body-banner" alt="logo" src="img/software-developer.jpg" />                    
    </div>
);  

export default Auth;