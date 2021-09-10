import React from "react";
import PropTypes from "prop-types";

import Navigation from "./presenter";

function Container(props, content) {
	
	const __getProfile_handler__ = event => {
		event.preventDefault();
		props.getProfile();
		console.log(props.post_list);
	}

	const __logout_handler__ = event => {
		event.preventDefault();
		props.logout();
	}
	
	return (
		<Navigation
			getProfile_handler = {__getProfile_handler__}
			logout_handler 	= {__logout_handler__}
		/>
	);
}

Container.propTypes = {
	getProfile : PropTypes.func.isRequired,
	logout : PropTypes.func.isRequired,
}

export default Container;

