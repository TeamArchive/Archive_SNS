import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './redux/configureStore';

import './Global/css/input.css'
import './Global/css/button.css'
import './Global/css/form.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);