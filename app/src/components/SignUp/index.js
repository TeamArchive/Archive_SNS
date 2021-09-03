import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as accountAct } from "../../redux/modules/account";

const mapDispatchToProps = (dispatch, props) => {
	return {
		createAccount: (email, pw, confirm_pw, img, alias) => {
			dispatch(accountAct.createAccount(email, pw, confirm_pw, img, alias));
		}
	};
};

export default connect(null, mapDispatchToProps)(Container);
