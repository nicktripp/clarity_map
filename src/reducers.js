import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { SET_STYLE } from './actions'

function StylesheetReducer(styleState = null, action) {
    switch(action.type) {
        case SET_STYLE:
            return Immutable.fromJS(action.style)
        default:
            return styleState
    }
}

const rootReducer = combineReducers({
    mapStyle: StylesheetReducer,
});

export default rootReducer
