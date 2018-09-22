import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { SET_STYLE, CLICK_MAP, } from './actions'

function StylesheetReducer(styleState = null, action) {
    switch(action.type) {
        case SET_STYLE:
            return Immutable.fromJS(action.style)
        default:
            return styleState
    }
}

function popupCreator(map) {
    if(!map) return null;


    const { lng, lat } = map;

    return `<div>
                LONG: ${ lng.toFixed(4) } <br />
                LAT:  ${ lat.toFixed(4) } <br />
            </div>`
}

function PopupReducer(popup = null, action) {
    switch(action.type) {
        case CLICK_MAP:
            return popupCreator(action.map);
        default:
            return popup
    }
}

const rootReducer = combineReducers({
    mapStyle: StylesheetReducer,
    popup: PopupReducer,
});

export default rootReducer
