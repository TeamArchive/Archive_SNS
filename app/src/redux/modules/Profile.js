const GET_PROFILE_DATA		= "GET_PROFILE_DATA";

function getProfileData(data) {
	return {
		type: GET_PROFILE_DATA,
		data
	};
}

function getProfile(pk) {
	return (dispatch) => {

		fetch("/account/account/" + pk, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"pk": pk
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch(getProfileData(json.data));
				console.log("Profile redux run",getProfileData);
			}
		})
		.catch(err => console.log(err));
	};
};

const initialState = {
	getProfile : []
};

function reducer(state = initialState, action) {
	
	switch(action.type) {
		case GET_PROFILE_DATA:
			return applyGetProfileData(state, action);
			
		default:
			return state;
	}
}

function applyGetProfileData(state, action) {
	const {data} = action;

	return {
		...state,
		profile_data: data
	};
}

const actionCreators = {
	getProfile,
};

export { actionCreators };

export default reducer;