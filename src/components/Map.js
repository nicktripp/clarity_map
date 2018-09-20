import React from 'react'
import mapboxgl from 'mapbox-gl'
import PropTypes from 'prop-types'

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = props.map
        console.log('Map props: '+ JSON.stringify(props.map))
    }

    setAccessToken() {
        const ACCESS_TOKEN = "pk.eyJ1Ijoibmlja2V0cmlwcCIsImEiOiJjam05cDE4ODAwOWY0M3FxZDA0MDB4aWQ5In0.8fWVxjwG_mYqiVzkXFKpxw"
        mapboxgl.accessToken = ACCESS_TOKEN
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        this.setAccessToken()

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        this.map.on('move', () => {
            const { lng, lat } = this.map.getCenter();

            this.setState(() => {
                return {
                    lng: lng.toFixed(4),
                    lat: lat.toFixed(4),
                    zoom: this.map.getZoom().toFixed(2)
                }
            });
        });
    }

    componentWillUnmount() {
        if (this.map)
            this.map.remove();
    }

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
        };

        return (
            <div
                style={style}
                ref={el => this.mapContainer = el}
            />
        );
    }
}

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
}


export default Map
