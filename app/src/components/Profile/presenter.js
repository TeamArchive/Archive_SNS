import React from "react";
import PropTypes from "prop-types";

const Profile = (props, context) => (
<div className = "Home_form">
    <div className='center-form'>
        <br/><br/>
            <h1>Profile</h1>
            Name : {props.info?.name}   <br/>
            Email : {props.info?.email} <br/>
            Status_msg : {props.info?.status_msg}<br/>
            PK: {props.account?.PK}
            <hr/>

        {/* <from className = "Profile_Edit">
            <h5>Profile_Edit</h5>

            Email : &nbsp;
            <input
                placeholder = "Email"
                name = "email"
                type = "email"
                value = {props.email_val}
                onChange = {props.text_input_handler}
                /> <br/>

            Name : &nbsp;
            <input
                placeholder = "Name"
                name = "name"
                type = "name"
                value = {props.name_val}
                onChange = {props.text_input_handler}
                /> <br/>

            Password : &nbsp;
            <input
                placeholder = "Password"
                name = "password"
                type = "password"
                value = {props.password_val}
                onChange = {props.text_input_handler}
                />
                <br/>
            img : <br/>

            msg : &nbsp;
            <input
                placeholde = "Status_msg"
                name = "msg"
                type = "text"
                value = {props.msg_val}
                onChange = {props.text_input_handler}
                />

        </from> */}

        <div>
            <hr/>
                test_load<br/>
                email : {props.email_val}<br/>
                name  : {props.name_val}<br/>
                pw : {props.password_val}<br/>
                msg : {props.msg_val}
            <hr/>
        </div>

        <button
            onClick = {props.submit_handler}
            type = "submit">
                <span>profile_edit</span>
        </button>

        <button
            onClick = {props.Unsubscribe}
            type = "submit">
                <span>Unsubscribe</span>
        </button>  
    </div>
</div>
);

Profile.propTypes = {
    email_val           : PropTypes.string.isRequired,
    password_val        : PropTypes.string.isRequired,
    name_val            : PropTypes.string.isRequired,
    msg_val             : PropTypes.string.isRequired,

    text_input_handler	: PropTypes.func.isRequired,
	submit_handler		: PropTypes.func.isRequired,
}


export default Profile;