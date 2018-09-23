import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { SET_STYLE, CLICK_MAP, SET_GEOCODER, SET_SEARCH_RESULTS } from './actions'

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

function GeocodeReducer(geocoder = null, action) {
    switch(action.type) {
        case SET_GEOCODER:
            return action.geocoder
        default:
            return geocoder
    }
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

function searchResults(searchResults = null, action) {
    switch(action.type) {
        case SET_SEARCH_RESULTS:
            return action.results
        default:
            return searchResults
    }
}

const rootReducer = combineReducers({
    mapStyle: StylesheetReducer,
    popup: PopupReducer,
    nodes,
    geocoder: GeocodeReducer,
    searchResults,
});

export default rootReducer
