// Action Types:

export const PAN_MAP = "PAN_MAP"
export const ZOOM_MAP = "ZOOM_MAP"
export const SET_SEARCH_RESULTS_VISIBLE = "SET_SEARCH_RESULTS_VISIBLE"

export function panMap(lat, lng) {
    return { type: PAN_MAP, lat, lng };
}

export function zoomMap(zoom) {
    return { type: PAN_MAP, zoom };
}

export function setSearchResultsVisible(isVisible) {
    return { type: SET_SEARCH_RESULTS_VISIBLE,  isVisible }
}
