import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, props) => {
	const { account, router: { location } } = state;

	return {
		isLoggedIn: account.isLoggedIn,
		pathname: location.pathname
	};
};

export default connect(mapStateToProps)(Container);
