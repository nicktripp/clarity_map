// Action Types:
export const SET_STYLE = "SET_STYLE"
export const CLICK_MAP = "CLICK_MAP"
export const SET_GEOCODER = "SET_GEOCODER"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"
export const HIGHLIGHT_AND_FLY_TO_PT = "HIGHLIGHT_AND_FLY_TO_PT"

/**
 * The map style is to be changed.
 */
export function setStyle(style) {
    return {
        type: SET_STYLE,
        style,
    }
}

/**
 * The map has been clicked, resulting in a payload of event data.
 */
export function clickMap(payload) {
    return {
        type: CLICK_MAP,
        payload,
    }
}

/**
 * A geocoder is to be added to our map
 */
export function setGeocoder(geocoder) {
    return {
        type: SET_GEOCODER,
        geocoder,
    }
}

/**
 * A geocoder was queried and returned the following results
 */
export function setSearchResults(searchResults) {
    return {
        type: SET_SEARCH_RESULTS,
        searchResults,
    }
}

/**
 * Indicates that a point(stored in nodeData) should be flown to on the map.
 */
export function highlightAndFlyToPt(nodeData) {
    return {
        type: HIGHLIGHT_AND_FLY_TO_PT,
        nodeData,
    }
}
