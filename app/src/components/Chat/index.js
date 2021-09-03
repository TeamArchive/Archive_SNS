import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, props) => {
	const { account, socket: { chatSocket } } = state;

	return {
		accessToken: account.AccessToken,
		chatSocket: chatSocket
	};
};

export default connect(mapStateToProps)(Container);
