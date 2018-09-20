import React from 'react'
import VisibleMap from '../containers/VisibleMap'
import Searchbar from './Searchbar'



const App = () => (
    <div>
        <VisibleMap />
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
