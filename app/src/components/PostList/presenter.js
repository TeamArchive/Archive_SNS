import React from 'react';
import './styles.css'

import Comment from "../Comment";

const PostList = (props) => (
    <div className="postList_form">
        <div className="post-user-form">

        </div>
        <div className="post-content-form">

            <div className="top">
                <span className="title">{props.Post_title}</span>
                <span className="writer">{props.Post_writer}</span>
            </div>

            <div className="center">
                <p className="textarea">{props.Post_text}</p>
                {props.Post_time}
            </div>

            <div className="bottem">
                <input
                    onClick = {props.delete_handler}
                    className="btn"
                    type="button"
                    value="delete"/>

                <input
                    className="btn"
                    type="button"
                    value="Like"/>
            </div>

            <div className="comment_form">
                <Comment post_pk={props.Post_pk}/> 
            </div>
        </div>
    </div>
);  

export default PostList;