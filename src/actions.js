// Action Types:
export const SET_STYLE = "SET_STYLE"
export const CLICK_MAP = "CLICK_MAP"
export const SET_GEOCODER = "SET_GEOCODER"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"
export const HIGHLIGHT_AND_FLY_TO_PT = "HIGHLIGHT_AND_FLY_TO_PT"

// Action creators
export function setStyle(style) {
    return {
        type: SET_STYLE,
        style,
    }
}

export function clickMap(payload) {
    return {
        type: CLICK_MAP,
        payload,
    }
}

export function setGeocoder(geocoder) {
    return {
        type: SET_GEOCODER,
        geocoder,
    }
}

export function setSearchResults(searchResults) {
    return {
        type: SET_SEARCH_RESULTS,
        searchResults,
    }
}

export function highlightAndFlyToPt(nodeData) {
    return {
        type: HIGHLIGHT_AND_FLY_TO_PT,
        nodeData,
    }
}
