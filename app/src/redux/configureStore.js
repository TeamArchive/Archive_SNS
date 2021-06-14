import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";

//redux modules import
import account from './modules/account'

const env = process.env.NODE_ENV;
const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const reducer = combineReducers({
    account,
    router : connectRouter(history),
});

let store;

if (env === "development") {
    store = initialState =>
        createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
    } else {
    store = initialState => createStore(reducer, applyMiddleware(...middlewares));
    }

export { history };

export default store();
