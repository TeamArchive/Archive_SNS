import React from 'react';
import './styles.css'

import Comment from "../Comment";
import Modal from "../Modals/modal";

const PostList = (props) => (
    <div className="postList_form">
        <div className="post-user-form">

        </div>
        <div className="post-content-form">
            <div className="post_list-top">
                <span className="post_title">{props.Post_title}</span>
                <span className="post_writer">{props.Post_writer}</span>
                <button 
                    className="Auth-guide-form" 
                    onClick={ props.openModal }>
                        상세보기
                </button>
            </div>

            <div className="post-center">
                <p className="textarea">{props.Post_text}</p>
                {props.Post_time}
            </div>

            <div className="post-bottem">
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
        </div>

        
    </div>
);  

export default PostList;