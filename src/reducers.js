import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { SET_STYLE, CLICK_MAP, SET_GEOCODER, SET_SEARCH_RESULTS, HIGHLIGHT_AND_FLY_TO_PT } from './actions'
import { popupCreator } from './components/Popup'

/**
 * Reducer for mapStyle slice of Redux state.
 */
function StylesheetReducer(styleState = null, action) {
    switch(action.type) {
        case SET_STYLE:
            return Immutable.fromJS(action.style)
        default:
            return styleState
    }
}

/**
 * Reducer for geocoder slice of Redux state
 */
function GeocodeReducer(geocoder = null, action) {
    switch(action.type) {
        case SET_GEOCODER:
            return action.geocoder
        default:
            return geocoder
    }
}

/**
 * Reducer for popup slice of Redux state.
 * NOTE: Ideally, we'd store an array popups, not just one.
 */
function PopupReducer(popup = null, action) {
    switch(action.type) {
        case CLICK_MAP:
            return popupCreator(action.payload);
        default:
            return popup
    }
}

/**
 * An Identity reducer for nodes of Redux state.
 * NOTE: We could modify this to add/remove nodes dynamically.
 */
function nodes(nodes = null, action) {
    return nodes
}

/**
 * An reducer for the searchResults slice of Redux state.
 */
function searchResults(searchResults = null, action) {
    switch(action.type) {
        case SET_SEARCH_RESULTS:
            return action.searchResults
        default:
            return searchResults
    }
}

/**
 * An reducer for the highlightedPoint slice of Redux state.
 */
function highlightedPoint(highlightedPoint = null, action) {
    switch(action.type) {
        case HIGHLIGHT_AND_FLY_TO_PT:
            return action.nodeData
        default:
            return highlightedPoint
    }
}

const rootReducer = combineReducers({
    mapStyle: StylesheetReducer,
    popup: PopupReducer,
    nodes,
    geocoder: GeocodeReducer,
    searchResults,
    highlightedPoint,
});

export default rootReducer
