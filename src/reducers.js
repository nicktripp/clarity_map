import { combineReducers } from 'redux'
import {
    PAN_MAP,
    ZOOM_MAP,
    SET_SEARCH_RESULTS_VISIBLE,
} from './actions'

function isResultListVisible(state = false, action) {
    switch(action.type) {
        case SET_SEARCH_RESULTS_VISIBLE:
            return action.isVisible
        default:
            return state
    }
}

const INITIAL_MAP_STATE = {
    lat: 0,
    lng: 0,
    zoom: 0,
}
function map(state = INITIAL_MAP_STATE, action) {
    switch(action.type) {
        case PAN_MAP:
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
            }
        case ZOOM_MAP:
            return {
                ...state,
                zoom: action.zoom,
            }
        default:
            return state
    }
}

const clarityApp = combineReducers({
    isResultListVisible,
    map,
});

export default clarityApp;
