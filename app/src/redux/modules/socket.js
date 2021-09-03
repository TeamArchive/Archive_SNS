import { Manager } from 'socket.io-client';

// < Actions >
// --------------------------------------------------

// < Actions Creators >
// --------------------------------------------------

// < API Actions >
// --------------------------------------------------

function setToken( token ) {

	return (dispatch, getState) => {

		const { socket : { chatSocket } } = getState();
	
		chatSocket.disconnect();

		chatSocket.auth = {token: `jwt ${token}`};

		chatSocket.connect();
	};
}

// < Initial State >
// --------------------------------------------------


const socketManager = new Manager(`ws://${window.location.hostname}:3000`, {
	transports: ['websocket'],
	jsonp: false
})
const accessTokenOnCookie = localStorage.getItem("AccessToken");

const initialState = {
	manager: socketManager,
	chatSocket: socketManager.socket('/chat', {
		auth: { token: `jwt ${accessTokenOnCookie ? accessTokenOnCookie : ''}` }
	}),
};

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {

		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

// < Exports >
// --------------------------------------------------

const actionCreators = {
	setToken,
};

export { actionCreators };

// export reducer by default

export default reducer;