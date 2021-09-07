import React from 'react';
import PropTypes from "prop-types";
import ImageUploader from '../ImageUploader';
import './styles.css';

const Post = (props) => (

<React.Fragment>
    <form
        className='Post-form'
        onSubmit={props.submit_handler}>
            
        <input
            className='input-form'
            type="text"
            name="title"
            value={props.post_info.title}
            onChange={props.text_input_handler}
            placeholder="title"/>

        <input
            className='input-form'
            type="text"
            name="text_content"
            value={props.post_info.text_content}
            onChange={props.text_input_handler}
            placeholder="content"/>

        <ImageUploader 
            upload = {props.upload}
            uploader = {props.uploader}
            post_info = {props.post_info}
            />

        <input
            style={{display: 'none'}}
            className='post_submit-btn'
            type="submit"
            value="Feed"/>
    </form>
    
    <center>
        <div className="Activity">
            <h3 style={{float: 'left', padding: '1vw'}}>Activity</h3>
        </div>
        <hr style={{backgroundColor: 'red'}}/>
    </center>
    <br/>  
</React.Fragment>
);  

Post.propTypes = {
	text_input_handler   	: PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
    uploader                : PropTypes.func.isRequired,
    
    post_info               : PropTypes.object.isRequired,
    upload                  : PropTypes.number.isRequired
};

export default Post;