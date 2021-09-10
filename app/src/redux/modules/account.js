import { actionCreators as socketAct } from "./socket";

// < Actions >
// --------------------------------------------------

const SAVE_TOKEN 	= "SAVE_TOKEN";
const LOGOUT 		= "LOGOUT";

// < Actions Creators >
// --------------------------------------------------

function saveToken(token) {
	return {
		type: SAVE_TOKEN,
		token
	};
}

function logout() {
	return {
		type: LOGOUT
	};
}

// < API Actions >
// --------------------------------------------------

function defaultLogin(email, password) {
	return (dispatch, getState) => {
		fetch("/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"email" 	: email,
				"password"	: password
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch( socketAct.setToken(json.data.access_token) );
				dispatch( saveToken(json.data) );
			}
		})
		.catch(err => console.log(err));
	};
}

function googleLogin(data){
	return (dispatch, getState) => {
		fetch("/auth/google", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch( socketAct.setToken(json.data.access_token) );
				dispatch( saveToken(json.data) );
			}
		})
		.catch(err => console.log(err));
	}
}

function createAccount(data) {
	return dispatch => {
		fetch("/account", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => { 
			if (json.data) {
				dispatch(saveToken(json.data));
			};
		})
		.catch(err => console.log(err));
	};
}

// < Initial State >
// --------------------------------------------------

const initialState = {
	isLoggedIn: localStorage.getItem("AccessToken") ? true : false,
	AccessToken: localStorage.getItem("AccessToken"),
	RefreshToken: localStorage.getItem("RefeshToken"),
	PK: localStorage.getItem("PK"),
};

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case SAVE_TOKEN:
			return applySetToken(state, action);
		case LOGOUT:
			return applyLogout(state, action);
		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

function applySetToken(state, action) {
	const { access_token, 
			refresh_token, 
			account_pk } = action.token;

	localStorage.setItem("AccessToken", access_token);
	localStorage.setItem("RefreshToken", refresh_token);
	localStorage.setItem("PK", account_pk);

	return {
		...state,
		isLoggedIn		: true,
		AccessToken		: access_token,
		RefreshToken	: refresh_token,
		PK				: account_pk,
	};
}

function applyLogout(state, action) {

	localStorage.removeItem("AccessToken");
	localStorage.removeItem("RefreshToken");
	localStorage.removeItem("PK");

	return {
		isLoggedIn: false,
		AccessToken: undefined,
		RefreshToken: undefined,
		PK: undefined
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	defaultLogin,
	googleLogin,
	createAccount,
	logout,
};

export { actionCreators };
export default reducer;