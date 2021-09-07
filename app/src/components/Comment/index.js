import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as commentAct } from "../../redux/modules/comment";

const mapStateToProps = (state, props) => {
	const { comment: { comment_list } } = state;

	return { 
        comment_list: 
        comment_list.find(
                elem => { 
                    if(elem.post_pk === props.post_pk) 
                    return elem 
                }
            )
        };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createComment: (post_pk, comment) => {
            dispatch(commentAct.createComment(post_pk, comment));
        },

        commentList: (post_pk, offset, limit, order_by) => {
            dispatch(commentAct.commentList(post_pk, offset, limit, order_by));
        },

        deleteComment : ( comment_pk ) => {
            dispatch(commentAct.deleteComment(comment_pk));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
