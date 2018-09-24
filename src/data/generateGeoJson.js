export const NODES_LAYER = "nodes"

export function generateCarmenNodeJSON(node) {
    return {
        center: [node.location.longitude, node.location.latitude],
        geometry: {
            type: "Point",
            coordinates: [node.location.longitude, node.location.latitude]
        },
        place_name: node.name, // eslint-disable-line camelcase
        place_type: ['node'], // eslint-disable-line camelcase
        properties: {},
        type: 'Feature',
        id: `node.${node.id}`,
    }
}

function generateNode(node, id) {
    return {
        "type": "Feature",
        "id": id,
        "geometry": {
            "type": "Point",
            "coordinates": [node.location.longitude, node.location.latitude],
        },
        "properties": {
            "title": node.name,
            "aqi": node.aqi,
            "lng": node.location.longitude,
            "lat": node.location.latitude,
            "type": "node"
        },
    }
}

export function generateNodeLayer(nodeList) {

    var data = []
    var i = 0
    for (const node of nodeList) {
        i++
        data.push(generateNode(node, i));
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
            "circle-radius": 15,
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
