import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as accountAct } from "../../redux/modules/account";

const mapStateToProps = (state, ownProps) => {
	const { account: { PK, isLoggedIn } } = state;

	return { PK, isLoggedIn };
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		logout: () => {
			dispatch(accountAct.logout());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
