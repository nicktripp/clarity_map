// Action Types:
export const SET_STYLE = "SET_STYLE"
export const CLICK_MAP = "CLICK_MAP"
export const SET_GEOCODER = "SET_GEOCODER"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"

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

export function setSearchResults(results) {
    return {
        type: SET_SEARCH_RESULTS,
        results,
    }
}
