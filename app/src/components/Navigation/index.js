import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as accountAct } from "../../redux/modules/account";
import { actionCreators as ProfileAct } from "../../redux/modules/profile";

const mapStateToProps = (state, ownProps) => {
	const { account: { PK, isLoggedIn, info } } = state;
	const { profile: { name, email } } = state;

	return { PK, isLoggedIn, name, email, info };
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		getProfile: ( PK ) => {
			dispatch(ProfileAct.getAccountData( localStorage.getItem("PK") ));
		},

		logout: () => {
			dispatch(accountAct.logout());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
