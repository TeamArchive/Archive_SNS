import React, { useState } from "react";
import PropTypes from "prop-types";
import Signup, { MAX_SIGNUP_STAGE } from "./presenter";

const Container = (props, context) => {
	
	const [page, setPage] = useState({
		stage : 1
	});

	const [account, setAccount] = useState({
		email		: '',
		password	: '',
		confirm_pw	: '',
		name		: '',
		status_msg	: ''
	});

	const { email, password, confirm_pw, name } = account;
	const { stage } = page;

	const __next_stage__ = () => {
		if (stage <= MAX_SIGNUP_STAGE ) {
			setPage({ stage : stage+1 });
		}
	}

	const __back_stage__ = () => {
		if (stage <= MAX_SIGNUP_STAGE ) {
			setPage({ stage : stage-1 });
		}
	}

	const __String_input_handler__ = event => {
		const { value, name } = event.target;
		setAccount({
			...account,
			[name]: value
		});
	};

	const __submit_handler__ = event => {
		event.preventDefault();
		props.createAccount(account);
	};

	return (
		<Signup
			email			= {email}
			password		= {password}
			confirm_pw		= {confirm_pw}
			name			= {name}
			current_stage 	= {stage}

			back_stage			= {__back_stage__}
			next_stage 			= {__next_stage__}

			String_input_handler 	= {__String_input_handler__}
			submit_handler 		= {__submit_handler__} />
	);

}

Container.propTypes = {
	createAccount : PropTypes.func.isRequired,
};

export default Container;
