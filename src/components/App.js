import React from 'react'
import Map from '../containers/Map'
import Searchbar from './Searchbar'

const TOKEN = "pk.eyJ1Ijoibmlja2V0cmlwcCIsImEiOiJjam05cDE4ODAwOWY0M3FxZDA0MDB4aWQ5In0.8fWVxjwG_mYqiVzkXFKpxw";
const STYLE_ID = 'streets-v9';

// Focus on Auckland, NZ
const LONG = 174.75;
const LAT = -36.85;
const ZOOM = 10;


const App = () => (
    <div>
        <Map
            token= { TOKEN }
            longitude= { LONG }
            latitude= { LAT }
            zoom= { ZOOM }
            showPopUp= { true }
            styleID = { STYLE_ID }
        />
        <Searchbar />
    </div>
)

export default App;


/*
App state:
{
    map: {
        zoom: int,
        lat: float,
        long: float,
    },

    visiblePoints: [
        {nodes?}
    ]

    search: {
        input: str
    },
    isResultListVisible: bool,
    resultList: {

        results: [
            result1: {
                name: str,
                lat: float,
                long: float,
            },
            result2: {...},
        ]
    }


}


*/
