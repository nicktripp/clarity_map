import React from 'react'
import ReactDOMServer from 'react-dom/server';
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import { Card, Tag } from 'antd'

import getColor from './data/aqi'
import { SET_STYLE, CLICK_MAP, SET_GEOCODER, SET_SEARCH_RESULTS, HIGHLIGHT_AND_FLY_TO_PT } from './actions'

function StylesheetReducer(styleState = null, action) {
    switch(action.type) {
        case SET_STYLE:
            return Immutable.fromJS(action.style)
        default:
            return styleState
    }
}

function nodePopupCreator(node) {
    if(!node) return null;

    const { title, aqi, } = node.properties
    return ReactDOMServer.renderToString(
        <Card
            title={title}
            bodyStyle={{padding: "0px"}}
        >
            <div className="popupContent">
                <Tag className={"popupTag " + (getColor(aqi) === "#FFFF00" ? "txt-black" : "")} color={getColor(aqi)}>
                    AQI: {aqi}
                </Tag>

            </div>
        </Card>
    )
}


function popupCreator(data) {
    if(!data) return null;

    if (data.type === 'mapClick') {
        return null;
    } else {
        return nodePopupCreator(data)
    }

}

function GeocodeReducer(geocoder = null, action) {
    switch(action.type) {
        case SET_GEOCODER:
            return action.geocoder
        default:
            return geocoder
    }
}

function PopupReducer(popup = null, action) {
    switch(action.type) {
        case CLICK_MAP:
            return popupCreator(action.payload);
        default:
            return popup
    }
}

function nodes(nodes = null, action) {
    return nodes
}

function searchResults(searchResults = null, action) {
    switch(action.type) {
        case SET_SEARCH_RESULTS:
            return action.searchResults
        default:
            return searchResults
    }
}

function highlightedPoint(highlightedPoint = null, action) {
    switch(action.type) {
        case HIGHLIGHT_AND_FLY_TO_PT:
            return action.nodeData
        default:
            return highlightedPoint
    }
}

const rootReducer = combineReducers({
    mapStyle: StylesheetReducer,
    popup: PopupReducer,
    nodes,
    geocoder: GeocodeReducer,
    searchResults,
    highlightedPoint,
});

export default rootReducer
