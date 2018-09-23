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

function nodePopupCreator(node) {
    if(!node) return null;

    const { title, aqi, lng, lat } = node.properties
    return `<div>
                ${ title } <br />
                AQU: ${ aqi } <br />
                LONG: ${ lng.toFixed(4) } <br />
                LAT:  ${ lat.toFixed(4) } <br />
            </div>`
}

function mapPopupCreator(map) {
    if(!map) return null;

    const { lng, lat } = map;
    return `<div>
                LONG: ${ lng.toFixed(4) } <br />
                LAT:  ${ lat.toFixed(4) } <br />
            </div>`
}

function popupCreator(data) {
    if(!data) return null;

    if (data.type === 'mapClick')
        return mapPopupCreator(data)
    else
        return nodePopupCreator(data)

}

function PopupReducer(popup = null, action) {
    switch(action.type) {
        case CLICK_MAP:
            return popupCreator(action.payload);
        default:
            return popup
    }
}

function nodes(nodes = null, action) {
    return nodes
}

const rootReducer = combineReducers({
    mapStyle: StylesheetReducer,
    popup: PopupReducer,
    nodes,
});

export default rootReducer
