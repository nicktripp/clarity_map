import React from 'react'
import mapboxgl from 'mapbox-gl'
import Immutable from 'immutable'
import { diffStyles } from 'mapbox-gl'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import MapboxGeocoder from 'mapbox-gl-geocoder'

import { setStyle, clickMap, setGeocoder } from '../actions'
import { generateNodeLayer, NODES_LAYER } from '../data/generateGeoJson'

class Map extends React.Component {

    // Helper functions
    configMap() {
        const { token, longitude, latitude, zoom, styleID, } = this.props;

        const mapConfig = {
            container: 'map',
            style: ('mapbox://styles/mapbox/' + styleID),
            center: [longitude, latitude],
            zoom: zoom,
        }

        mapboxgl.accessToken = token
        this.map = new mapboxgl.Map(mapConfig)
    }

    configGeocoder() {
        function getUniqueFeatures(array, comparatorProperty) {
            var existingFeatureKeys = {};
            // Because features come from tiled vector data, feature geometries may be split
            // or duplicated across tile boundaries and, as a result, features may appear
            // multiple times in query results.
            var uniqueFeatures = array.filter(function(el) {
                if (existingFeatureKeys[el[comparatorProperty]]) {
                    return false;
                } else {
                    existingFeatureKeys[el[comparatorProperty]] = true;
                    return true;
                }
            });

            return uniqueFeatures;
        }

        const nodesGeocoder = (query) => {
            var nodes = this.map.querySourceFeatures(NODES_LAYER)
            nodes = getUniqueFeatures(nodes, "id")
            var matchedNodes = [];
            for (const node of nodes) {
                if(node.properties.title.toLowerCase().search(query.toLowerCase()) !== -1)
                {
                    node['place_name'] = '🌲 ' + node.properties.title;
                    node['center'] = node.geometry.coordinates;
                    node['place_type'] = ['node'];
                    matchedNodes.push(node)
                }
            }

            return matchedNodes;
        };

        // Add search functionality
        const geocoder = new MapboxGeocoder({
            localGeocoder: nodesGeocoder,
            accessToken: mapboxgl.accessToken,
            flyTo: false,
        });

        geocoder.onAdd(this.map);
        this.props.setGeocoder(geocoder);
    }

    configNodes() {
        const { nodes } = this.props
        const nodeLayer = generateNodeLayer(nodes)
        this.map.addLayer(nodeLayer);
    }

    configMapClick() {
        // Listen for a map click, get the features under the pointer
        // and pass them to a "clickMap" action that might update our UI
        // or highlight the feature in the stylesheet:
        this.map.on('click', event => {
            const features = this.map.queryRenderedFeatures(event.point);

            // Send a specific feature to the action/reducer:
            const selectedFeature = features.filter(f => f.layer.id === NODES_LAYER)[0];

            var data = null;
            if (selectedFeature !== undefined) {
                data = selectedFeature;
            } else {
                data = {
                    type: "mapClick",
                    lng: event.lngLat.lng,
                    lat: event.lngLat.lat,
                }
            }
            this.props.clickMap(data);

            // We can also use the native mapbox popup if the clickMap
            // action sets some html to show and passes it as a prop:
            if(this.props.showPopUp && this.props.popup != null) {
                new mapboxgl.Popup()
                .setLngLat(event.lngLat)
                .setHTML(this.props.popup)
                .addTo(this.map);
            }
        });
    }

    configNodeHover(hoveredNodeID) {
        // When the user moves their mouse over a point, we'll update the
        // feature state for the feature under the mouse.
        this.map.on("mousemove", NODES_LAYER, e => {
            if (e.features.length > 0) {
                if (hoveredNodeID) {
                    this.map.setFeatureState({source: NODES_LAYER, id: hoveredNodeID}, { hover: false });
                }
                hoveredNodeID = e.features[0].id;
                this.map.setFeatureState({ source: NODES_LAYER, id: hoveredNodeID}, { hover: true });
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        this.map.on("mouseleave", NODES_LAYER, () => {
            if (hoveredNodeID) {
                this.map.setFeatureState({source: NODES_LAYER, id: hoveredNodeID}, { hover: false });
            }
            hoveredNodeID =  null;
        });
    }


////////////////////////////

    componentDidMount() {
        this.configMap()
        this.configGeocoder()

        var hoveredNodeID = null

        this.map.on('load', () => {
            // Add all nodes to map
            this.configNodes()

            const style = this.map.getStyle();
            this.props.setStyle(style)

            this.configMapClick()

            hoveredNodeID = this.configNodeHover(hoveredNodeID)

        })
    }

    componentWillUnmount() {
        this.map.remove()
    }

    componentWillReceiveProps(nextProps) {
        // Prevent the diff'ing if function is
        // triggered before a style is set
        if(this.props.mapStyle === null) return;
        const map = this.map;

        // Remember where we are in the lifecycle here,
        // even though we already update the Redux state,
        // this component's current properties still
        // reflect the old state:
        const oldStyle = this.props.mapStyle;
        const newStyle = nextProps.mapStyle;

        // Do a deep equality check first to make sure
        // an update needs to happen. Avoid unnessecary
        // converting and diff'ing:
        if(!Immutable.is(oldStyle, newStyle)) {
            const changes = diffStyles(oldStyle.toJS(), newStyle.toJS());
            // 'changes' will be an array of:
            // {command: '...', args: ['...', ...]}
            // objects that can be applied to the map:
            changes.forEach(function(change) {
                map[change.command].apply(map, change.args);
            });
        }
    }

    render () {
        return (
            <div id="map" />
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setStyle: setStyle,
    clickMap: clickMap,
    setGeocoder: setGeocoder,
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    mapStyle: state.mapStyle,
    popup: state.popup,
    nodes: state.nodes,
    geocoder: state.geocoder,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
