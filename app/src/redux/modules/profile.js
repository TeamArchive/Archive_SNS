// < Actions >
// --------------------------------------------------

const SAVE_PROFILE	= "SAVE_PROFILE";

// < Actions Creators >
// --------------------------------------------------

function saveProfile(data) {
	return {
		type: SAVE_PROFILE,
		data
	};
}

// < API Actions >
// --------------------------------------------------

function getAccountData(PK){
	return dispatch => {
		fetch("/account/" + PK, {
			method: "GET",
			headers: { 'Content-Type': 'application/json' },
		})
		.then(response => response.json())
		.then(json => { 
			if (json.data) {
				dispatch(saveProfile(json.data));
				console.log("getAccountData redux run ...", json.data);
			};
		})
		.catch(err => console.log(err));
	};
}

// < Initial State >
// --------------------------------------------------

const initialState = {

};

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case SAVE_PROFILE:
			return applySetProfile(state, action);
		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

function applySetProfile(state, action) {

	const { data } = action;
	
	console.log("profile state: ", action);
	return {
		...state,
		data: data
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	getAccountData
};

export { actionCreators };
export default reducer;