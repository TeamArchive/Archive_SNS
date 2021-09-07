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
                    className="guide-text" 
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

            <Modal 
                open={ props.modalOpen } 
                close={ props.closeModal } 
                header={props.Post_title}>
                    <span>{props.Post_text}</span>
                    <span className="post_writer">작성자 : {props.Post_writer}</span>
            </Modal>
            
            <div className="comment_form">
                <Comment post_pk={props.Post_pk}/> 
            </div>
        </div>
    </div>
);  

export default PostList;