import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Chat from "./presenter";

const Container = (props, context) => {

	const [state, setState] = useState({
		group_pk: 'feeaada2-1117-4ea8-a6cd-7d704c0044e5',
		input_message : '',
	});

	useEffect(() => {
		props.chatHistory('feeaada2-1117-4ea8-a6cd-7d704c0044e5');

		props.chatSocket.on('receiveSendChat', (res) => {
			console.log("on message : ", res);
		});

		props.chatSocket.on('receiveDeleteChat', (res) => {
			console.log("on message : ", res);
		});
	});

	const __input_handler__ = event => {
		const { value, name } = event.target;
		console.log(name, " => ", value);

		setState({
			...state,
			[name]: value
		});
	};

	const __delete_handler__ = (chat_pk) => {

		props.chatSocket.emit('deleteChat', {
			'group_pk': state.group_pk,
		});

	}

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
			input_handler	= {__input_handler__}
			delete_handler	= {__delete_handler__}
			submit_handler	= {__submit_handler__}
			
			input_message	= {state.input_message}
			messages		= {props.messages}
		/>
	);

}

Container.propTypes = {
	accessToken: PropTypes.string,
}

export default Container;