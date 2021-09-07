import React, { useState, useEffect } from "react";
import Comment, { CommentView } from "./presenter";

const Container = (props) => {
    useEffect(() => {
        props.commentList(0, 5, 1);
    }, [props])

    const [commentInfo, setCommentInfo] = useState({
        comment     : '',
    });

    const { comment } = commentInfo;

    const comment_input_handler = event => {
        const { value, name } = event.target;
        setCommentInfo({
            ...commentInfo,
            [name]: value
        });
    };

    const submit_handler = event => {
        event.preventDefault();
        props.createComment(props.post_pk, comment);
    }

    const draw_handler = () => {
        return props.comment_list?.comments.map( 
            elem => 
            <CommentView 
                comment={elem}
                delete_handler = {() => props.deleteComment(elem.pk)}/>
        )
    }

    return (
        <Comment
            comment_input_handler       = {comment_input_handler}
            submit_handler              = {submit_handler}
            draw_handler                = {draw_handler}
            comment                     = {comment}
            commentInfo                 = {commentInfo}
        />
    );
}

export default Container;