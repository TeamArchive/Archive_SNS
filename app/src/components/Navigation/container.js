import React from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

function Container(props, content) {

	const __User_handler__ = () => {
		console.log(props.accountAct);
	}

	const __logout_handler__ = event => {
		event.preventDefault();
		props.logout();
	}
	
	return (
		<Navigation
			User_hanlder 	= {__User_handler__}
			logout_handler 	= {__logout_handler__}
		/>
	);
}

Container.propTypes = {
	logout : PropTypes.func.isRequired,
}

export default Container;

