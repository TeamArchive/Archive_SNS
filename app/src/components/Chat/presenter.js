import React from 'react';

const Chat = (props) => (

    <>
        <h1> Chat </h1>
            
        <div>

		</div>

		<input 
            type = 'text'
            name = 'input_message'
            placeholder = 'Type message at here'
            value = {props.input_message}
            onChange = {props.input_hander}
            />

        <input
            type = 'submit'
            value = 'click'
            onClick = {props.submit_handler}
            />

    </>
);  

export default Chat;