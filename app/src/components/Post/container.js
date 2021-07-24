import React, { useState } from "react";
import PropTypes from "prop-types";
import Post from "./presenter";

function Container(props, content) {

	const PostInfoInit = {
		title				: '',
		text_content		: '',
	};

	const [PostInfo, setPostInfo] = useState(PostInfoInit);

	const __uploader__ = (img) => {
		const data = new FormData();
		
		img.map(elem => data.append('image', elem));

		Object.keys(PostInfo).map( elem => {
			data.append( elem, PostInfo[elem] );
		});

		props.createPost(data);
	}

	const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setPostInfo({
			...PostInfo,
			[name]: value
		});
    };

	const __submit_handler__ = event => {
		event.preventDefault(); 
		console.log("new_Post_input_run ...")
		console.log(PostInfo);
		props.createPost(PostInfo);

	};

	return (
		<Post
			text_input_handler 		= {__text_input_handler__}
			submit_handler 			= {__submit_handler__} 
			uploader				= {__uploader__}

			post_info 				= {PostInfo}
		/>
	);
}

Container.propTypes = {
	createPost : PropTypes.func.isRequired
};

export default Container;

