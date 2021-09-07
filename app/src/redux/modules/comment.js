// < Actions >
// --------------------------------------------------

const SAVE_NEW_COMMENT = "SAVE_NEW_COMMENT";
const DELETE_COMMENT   = "DELETE_COMMENT";
const GET_COMMENT_LIST = "GET_COMMENT_LIST";

// < Actions Creators >
// --------------------------------------------------

function saveNewComment(data, is_created = false) {
	return {
		type: SAVE_NEW_COMMENT,
		is_created: is_created,
		data
	}
}

function deleteCommentFromList(pk){
	return {
		type: DELETE_COMMENT,
		pk
	}
}

function getCommentList(data) {
	return {
		type: GET_COMMENT_LIST,
		data
	}
}

// < API Actions >
// --------------------------------------------------


function createComment(post_pk, comment) {
    return (dispatch, getState) => {
		const { account } = getState();
		
		fetch("/comment/" + post_pk, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${account.AccessToken}`
			},
			body: JSON.stringify({
				content     : comment
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch(saveNewComment([{
					...json.data,
					writer: {
						pk : account.PK,
						name : account.name,
						...account.info
					}
				}], true));
			}
		})
		.then(console.log('사용자 PK: ', account.PK))
		.catch(err => console.log(err));
    };
    
};

function deleteComment( comment_pk ) {
	return (dispatch, getState ) => {
		const { account : { AccessToken }} = getState();

		fetch("/comment/" + comment_pk, {
			method: "DELETE",
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AccessToken}`	
			}
		})
		.then(res => {
			if(res.status === 200) {
				dispatch(deleteCommentFromList(comment_pk));
				console.log(comment_pk);
			}
		})
		.catch(err => console.log(err));
    };
    
};

function commentList(post_pk, offset, limit, order_by) {

	return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/comment/" + post_pk, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AccessToken}`
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
				dispatch(getCommentList(json.data));
			}
		})
		.catch(err => console.log(err));
    };

}

// < Initial State >
// --------------------------------------------------

const initialState = {
	new_comment_count : 0,
	comment_list : []
}

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case SAVE_NEW_COMMENT:
			return applySaveNewComment(state, action);
	
		case DELETE_COMMENT:
			return applyDeleteComment(state, action);

		case GET_COMMENT_LIST:
			return applyGetCommentList(state, action);

		default:
			return state;
	}
}

function applySaveNewComment(state, action) {
	
	const {data} = action;
	const post_pk = data[0]?.post_pk;
	const { comment_list } = state;
	let need_new = true;

	comment_list.map( comment => {
		if(comment.post_pk === post_pk)
			need_new = false;
	});

	return {
		...state,
		comment_list : (
			need_new
			? (
				comment_list.concat([{
					post_pk: post_pk,
					comments: data
				}])
			)
			: (
				comment_list.map( 
					comment => (comment.post_pk === post_pk)
					? {...comment, comments: (
							action.is_created 
							?data.concat(comment.comments)
							:comment.comments.concat(data)
						)} 
					:  comment
				)
			)
		)
	}
}

function applyGetCommentList(state, action) {
	const { data } = action;

	return {
		...state,
		comment_list : data
	}
}

function applyDeleteComment(state, action) {
	const { pk } = action;
	const { comment_list } = state;

	comment_list.splice(comment_list.filter((elem) => elem.pk === pk), 1)

	return {
		...state,
		comment_list : comment_list
	}
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	createComment,
	commentList,
	deleteComment
};

export { actionCreators };

export default reducer;