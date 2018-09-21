// Action Types:
export const SET_STYLE = "SET_STYLE"
export const CLICK_MAP = "CLICK_MAP"

// Action creators
export function setStyle(style) {
    return {
        type: SET_STYLE,
        style,
    }
}

export function clickMap(map) {
    return {
        type: CLICK_MAP,
        map,
    }
}
