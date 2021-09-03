import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as chatAct } from "../../redux/modules/chat";

const mapStateToProps = (state, props) => {
	const { account, socket: { chatSocket }, chat: {messages} } = state;

	return {
		accessToken: account.AccessToken,
		chatSocket: chatSocket
	};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        chatHistory: (group_pk) => {
            dispatch(chatAct.getHistory(group_pk));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
