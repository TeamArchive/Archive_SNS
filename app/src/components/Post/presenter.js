import React from 'react';
import PropTypes from "prop-types";

const Post = (props) => (

    <>
        <h1>Post</h1>

    <form
        onSubmit={props.submit_handler}
        >
        <input
            type="text"
            name="title"
            value={props.post_info.title}
            onChange={props.text_input_handler}
            placeholder="title"
            />

        <input
            type="text"
            name="text_content"
            value={props.post_info.text_content}
            onChange={props.text_input_handler}
            placeholder="content"
            />

        <input
            type="submit"
            value="post"
            />
    </form>
    
    </>
);  

Post.propTypes = {
	text_input_handler   	: PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
    
    post_info               : PropTypes.object.isRequired,
};

export default Post;