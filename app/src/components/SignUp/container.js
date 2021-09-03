import React, { useState } from "react";
import PropTypes from "prop-types";
import SignUp, { MAX_SIGNUP_STAGE } from "./presenter";

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

	const [base64, setBase64] = useState("");
	const [imgFile, setImgFile] = useState(null);

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

	const __img_input_handler__ = event => {
		const reader = new FileReader();
		const file = event.target.files[0];
		
		reader.onloadend = () => {
			if (file && reader.result) 
				setBase64(reader.result.toString());

			console.log(base64);
		}

		if(file) {
			reader.readAsDataURL(file);
			setImgFile(file);
		}
		
	};

	const __submit_handler__ = event => {
		event.preventDefault();
		const data = new FormData();

		data.append('image', imgFile)
		Object.keys(account).map( elem => {
			data.append( elem, account[elem] );
		});
		props.createAccount(account);
	};

	return (
		<SignUp
			account_email		= { email }
			account_pw			= { password }
			account_confirm_pw	= { confirm_pw }
			account_alias		= { name }
			current_stage 		= { stage }
			account_img_preview	= { base64 }

			back_stage			= { __back_stage__ }
			next_stage 			= { __next_stage__ }

			String_input_handler 	= { __String_input_handler__ }
			img_input_handler		= { __img_input_handler__ }
			submit_handler 			= { __submit_handler__ } 
		/>
	);

}

Container.propTypes = {
	createAccount : PropTypes.func.isRequired,
};

export default Container;
