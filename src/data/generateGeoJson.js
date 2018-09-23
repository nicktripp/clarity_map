export const NODES_LAYER = "nodes"

export function generateNodeLayer(nodeList) {

    var data = []
    var i = 0
    for (const node of nodeList) {
        i++
        data.push({
            "type": "Feature",
            "id": i,
            "geometry": {
                "type": "Point",
                "coordinates": [node.location.longitude, node.location.latitude],
            },
            "properties": {
                "title": node.name,
                "aqi": node.aqi,
                "lng": node.location.longitude,
                "lat": node.location.latitude,
            },
        });
    }

    const ptsLayer = {
        "id": NODES_LAYER,
        "type": "circle",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": data,
            },
        },
        "paint": {
            "circle-opacity": 0.75,
            "circle-radius": 30,
            "circle-color": ["case",
                ["boolean", ["feature-state", "hover"], false],
                "#888888",
                ['step',
                    ['get', 'aqi'],
                    '#00E400',
                    50, '#FFFF00',
                    100, '#FF7E00',
                    150, '#FF0000',
                    200, '#8F3F97',
                    250, '#8F3F97',
                    300, '#7E0023',
                    350, '#7E0023',
                    400, '#7E0023',
                    500, '#7E0023',
                ],
            ],

        }
    }


    return ptsLayer
}
