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

	return (
		<Auth
			input_hander	= {__input_handler__}
			submit_handler	= {__submit_handler__}
			
			account_email	= {email}
			account_pw		= {password}
		/>
	);

}

Container.propTypes = {
	defaultLogin : PropTypes.func.isRequired,
}

export default Container;
