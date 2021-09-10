import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as ProfileAct } from "../../redux/modules/profile";

const mapStateToProps = (state, ownPorps) => {
    const { profile: { data } }= state;

	return { data };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getProfile: (PK) => {
            dispatch(ProfileAct.getAccountData(PK));
        },

        Unsubscribe : (PK) => {
            dispatch(ProfileAct.Unsubscribe(PK));
        },

        editProfile: (email, password, name, image, status_msg) => {
            dispatch(ProfileAct.editProfile(email, password, name, image, status_msg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
