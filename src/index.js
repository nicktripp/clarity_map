import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './reducers'
import App from './components/App'
import INIT_STATE from './initState'

import './index.css';

const store = createStore(rootReducer, INIT_STATE)


render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root')
);
