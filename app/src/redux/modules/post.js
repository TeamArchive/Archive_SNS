import { NavItem } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

const SAVE_NEW_POST = "SAVE_NEW_POST";
const DELETE_POST   = "DELETE_POST";
const GET_POST_LIST = "GET_POST_LIST";


function saveNewPost(data) {
	return {
		type: SAVE_NEW_POST,
		data
	}
}

function deletePostFromList(pk) {
	return {
		type: DELETE_POST,
		pk
	}
}

function getPostList(data) {
	return {
		type: GET_POST_LIST,
		data
	}
}

function createPost(data) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post/create", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${AccessToken}`
			},
			body: data
			
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(saveNewPost(json.data));
				console.log("createPost run ...", data);
			}
		})
		.catch(err => console.log(err));
    };
    
};

function deletePost( post_pk ) {

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();

		fetch("/post/" + post_pk, {
			method: "delete",
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AccessToken}`
			}
		})
		.then(res => {
			if(res.status === 200) {
				dispatch(deletePostFromList(post_pk));
			}
		})
		.catch(err => console.log(err));
    };
    
};

function postList(offset, limit, order_by) {

	return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post/list", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				offset 	: offset,
				limit	: limit,
				order_by: order_by,
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch(getPostList(json.data));
			}
		})
		.catch(err => console.log(err));
    };
};

// < Initial State >
// --------------------------------------------------

const initialState = {
	new_post_count : 0,
	post_list : undefined
}


function reducer(state = initialState, action) {
	switch(action.type) {
		case SAVE_NEW_POST:
			return applySaveNewPost(state, action);

        case DELETE_POST:
            return applyDeletePost(state, action);

		case GET_POST_LIST:
			return applyGetPostList(state, action);
		
		default:
			return state;
	}
}

function applySaveNewPost(state, action) {

	return  {
		...state,
		new_post_count : (state.new_post_count+1)
	}
}

function applyDeletePost(state, action) {
	const { pk } = action;
	const { post_list } = state;

	post_list.splice(post_list.filter((elem) => elem.pk === pk), 1)

	return {
		...state,
		post_list : post_list
	}
}
            
function applyGetPostList(state, action) {

	const { data } = action;

	return {
		...state,
		post_list : data
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	createPost,
	postList,
	deletePost
};

export { actionCreators };

export default reducer;