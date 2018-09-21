// Action Types:
export const SET_STYLE = "SET_STYLE"

// Action creators
export function setStyle(style) {
    return {
        type: SET_STYLE,
        style,
    }
}
