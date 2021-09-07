import React, { useState } from "react";
import PropTypes from "prop-types";
import Auth from "./presenter";

const Container = (props, context) => {

	const [account, setAccount] = useState({
		email	 : '',
		password : ''
	});

	const { email, password } = account;

	const __input_handler__ = event => {
		const { value, name } = event.target;
		setAccount({
			...account,
			[name]: value
		});
	};

	const __submit_handler__ = event => {
		event.preventDefault();
		props.defaultLogin(email, password);
	};

	const __google_Login_handler__ = event => {
		event.preventDefault();
		alert('log창을 열어서 오류를 확인해주세요.')
		props.googleLogin();
		console.log('googleLogin Click!');
	};

	return (
		<Auth
			input_hander			= {__input_handler__}
			submit_handler			= {__submit_handler__}
			google_Login_handler	= {__google_Login_handler__}
			account_email			= {email}
			account_pw				= {password}
		/>
	);

}

Container.propTypes = {
	defaultLogin : PropTypes.func.isRequired,
}

export default Container;
