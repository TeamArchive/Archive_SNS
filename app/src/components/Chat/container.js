import React, { useState } from "react";
import PropTypes from "prop-types";
import Chat from "./presenter";

const Container = (props, context) => {

	const [state, setState] = useState({
		group_pk: '',
		input_message : '',
	});

	props.chatSocket.on('receiveChat', (res) => {
		console.log("on message : ", res);
	});

	const __input_handler__ = event => {
		const { value, name } = event.target;
		console.log(name, " => ", value);

		setState({
			...state,
			[name]: value
		});
	};

	const __submit_handler__ = event => {
		event.preventDefault();
		props.chatSocket.emit('sendChat', {
			'group_pk': state.group_pk,
			'content': state.input_message
		});

		console.log(props.chatSocket);
			
		setState({
			...state,
			input_message: ''
		});
	};

	return (
		<Chat
			input_hander	= {__input_handler__}
			submit_handler	= {__submit_handler__}
			
			input_message	= {state.input_message}
			
		/>
	);

}

Container.propTypes = {
	accessToken: PropTypes.string,
}

export default Container;