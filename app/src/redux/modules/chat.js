import { Manager } from 'socket.io-client';

// < Actions >
// --------------------------------------------------

const SAVE_MESSAGE 	= "SAVE_MESSAGE";

// < Actions Creators >
// --------------------------------------------------

function saveMessage(messages) {
	return {
		type: SAVE_MESSAGE,
		messages
	};
}

// < API Actions >
// --------------------------------------------------

function getHistory( group_pk ) {

	return (dispatch, getState) => {

		fetch(`/chat/${group_pk}`, {
			method: "GET",
			headers: { 
				"Authorization": `Bearer ${getState().account.AccessToken}`,
				"Content-Type": "application/json" 
			}
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				const object = {};
				object[group_pk] = json.data;

				dispatch( saveMessage(object) );
			}
		})
		.catch(err => console.log(err));
	};
}

// < Initial State >
// --------------------------------------------------

// const ownGroups = {
// 	fetch(`/chat/${group_pk}`, {
// 		method: "GET",
// 		headers: { "Content-Type": "application/json" }
// 	})
// 	.then(response => response.json())
// 	.then(json => {
// 		if (json.data) {
// 			console.log(json.data)
// 		}
// 	})
// 	.catch(err => console.log(err));
// };

const initialState = {
	messages: {},
	groups: [],
};

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {

		case SAVE_MESSAGE:
			return applySetMessage(state, action);

		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

function applySetMessage(state, action) {

	const { messages } = action;

	const old = state.messages;

	const group_pk = Object.keys(messages)
	for(const pk of group_pk) {
		if (state.messages.hasOwnProperty(group_pk)) {
			old[pk] = [ ...old[pk], ...messages[pk] ];
		}
		else {
			old[pk] = messages[pk];
		}
	}

	return {
		...state, 
		messages: old
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	getHistory,
};

export { actionCreators };

// export reducer by default

export default reducer;