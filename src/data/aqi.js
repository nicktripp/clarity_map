const colors = {
    0: '#00E400',
    50: '#FFFF00',
    100: '#FF7E00',
    150: '#FF0000',
    200: '#8F3F97',
    250: '#8F3F97',
    300: '#7E0023',
    350: '#7E0023',
    400: '#7E0023',
    450: '#7E0023',
    500: '#7E0023'
}

/**
 * Transforms a given aqi into a string containing the corresponding AQI-level hex color.
 */
export default function getColor(aqi) {
    const key = Math.trunc(aqi/50)*50
    return colors[key]
}
