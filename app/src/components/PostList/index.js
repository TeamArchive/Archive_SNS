import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../redux/modules/post";

const mapStateToProps = (state, ownProps) => {
	const { post: { post_list } } = state;
    const { account: { info } } = state;

	return { post_list, info };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        postList: (offset, limit, order_by) => {
            dispatch(PostAct.postList(offset, limit, order_by));
        },
        
        deletePost : ( post_pk ) => {
            dispatch(PostAct.deletePost( post_pk ));
            console.log("deletePost index run")
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
