import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as groupAct } from "../../redux/modules/group";

const mapStateToProps = (state, props) => {
    const{ group: { group_list } } = state;

    return { group_list };
};

const mapDispatchToProps = (dispatch, props) =>{
    return {

        groupCreate: (Group_title, User_Pk) => {
            dispatch(groupAct.groupCreate(Group_title, User_Pk));
        },
        
        groupInvite: (group_pk, User_Pk) => {
            dispatch(groupAct.groupInvite(group_pk, User_Pk));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
