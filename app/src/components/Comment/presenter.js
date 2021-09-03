import React from 'react';
import PropTypes from "prop-types";
import './styles.css'

export const CommentView = props => (
    <React.Fragment>
        작성자 : {props.comment.writer.name} <br/>
        {props.comment.content}
            <button
                onClick = {props.delete_handler}
                type = "submit">
                delete
            </button>
        <hr/>
    </React.Fragment>
)

const Comment = props => (
    <div className="Comment">
        <br/>
        <form
            className="comment"
            onSubmit={props.submit_handler}
            method="post">

            <input 
                className="comment_input_form"
                name="comment"
                placeholder = "댓글을 입력해주세요." 
                value={props.comment}
                onChange = {props.comment_input_handler} />
            
            <input className="comment-btn" type="submit" value="댓글"/>
        </form>
        { props.draw_handler() }
    </div>
);

Comment.propTypes = {
    comment_input_handler   : PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
};

export default Comment;