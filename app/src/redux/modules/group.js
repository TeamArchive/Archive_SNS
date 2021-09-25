const SAVE_NEW_GROUP = "SAVE_NEW_GROUP";
const INVITE_GROUP = "INVITE_GROUP";
const GET_GROUP_LIST = "GET_GROUP_LIST";


function SaveNewGroup(data) {
    return {
        type: SAVE_NEW_GROUP,
        data
    }
}

function InviteGroup(data) {
    return {
        type: INVITE_GROUP,
        data
    }
}

function GetGroupList(data) {
    return {
        type: GET_GROUP_LIST,
        data
    }
}

function groupCreate(Group_title, User_Pk) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post_group/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${AccessToken}`
			},
			body: JSON.stringify({
				
                "title": Group_title,
                "member_pk_list": [
                    User_Pk
                ],
            
			})
		})
        .then(console.log("createGroup run ...", Group_title, User_Pk))
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(SaveNewGroup(json.data));
                
			}
		})
		.catch(err => console.log(err));
    };  
};

function groupInvite(group_pk) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post_group/invite" + group_pk, {
			method: "POST",
			headers: {
			Authorization: `${AccessToken}`
			},
			body: group_pk
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(InviteGroup(json.data));
			}
		})
		.catch(err => console.log(err));
    };  
};

function getGroupList() {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post_group", {
			method: "GET",
			headers: {
			Authorization: `${AccessToken}`
			},
			
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(GetGroupList(json.data));
			}
		})
		.catch(err => console.log(err));
    };  
};

const initialState = {
    group_list: []
}

function reducer (state = initialState, action) {
    switch(action.type) {
        case SAVE_NEW_GROUP:
            return applySaveNewGroup(state, action);

        case INVITE_GROUP:
            return applyInviteGroup(state, action);

        case GET_GROUP_LIST:
            return applyGetGroupList(state, action);

            default:
                return state;
    }
}

function applySaveNewGroup(state, action) {
    const { data } = action;

    return {
        ...state,

    }
}

function applyInviteGroup(state, action) {
    const { data } = action;

    return {
        ...state,
    }
}

function applyGetGroupList(state, action) {
    const { data } = action;

    return {
        ...state,
        group_list: data
    }
}

const actionCreators = {
    groupCreate,
    groupInvite,
    getGroupList,

};

export { actionCreators }; 

export default reducer;