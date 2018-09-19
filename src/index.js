import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import mapboxgl from 'mapbox-gl'
// Import reducer
import App from './components/App'

// const store = createStore(/* TODO: imported reducer */)

const ACCESS_TOKEN = "pk.eyJ1Ijoibmlja2V0cmlwcCIsImEiOiJjam05cDE4ODAwOWY0M3FxZDA0MDB4aWQ5In0.8fWVxjwG_mYqiVzkXFKpxw"
mapboxgl.accessToken = ACCESS_TOKEN

//////////////////////////////
//////////////////////////////
//////////////////////////////


class Map extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}

// ReactDOM.render(<Map />, document.getElementById('app'));


render(
    (
        // <Provider store={store}>
            <Map />
        // </Provider>
    ),
    document.getElementById('root')
);
