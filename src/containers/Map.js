import React from 'react'
import mapboxgl from 'mapbox-gl'
import Immutable from 'immutable'
import { diffStyles } from 'mapbox-gl'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setStyle } from '../actions'

class Map extends React.Component {

    componentDidMount() {
        const { token, longitude, latitude, zoom, styleID } = this.props;

        const mapConfig = {
            container: 'map',
            style: ('mapbox://styles/mapbox/' + styleID),
            center: [longitude, latitude],
            zoom: zoom,
        }

        mapboxgl.accessToken = token
        this.map = new mapboxgl.Map(mapConfig)
        console.log(this.map)


        this.map.on('load', () => {
            const style = this.map.getStyle();
            this.props.setStyle(style)
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
    setStyle: setStyle
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    mapStyle: state.mapStyle,
  };
}

console.log("Connecting Map to Redux...")
export default connect(mapStateToProps, mapDispatchToProps)(Map);
