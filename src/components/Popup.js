import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { Card, Tag } from 'antd'

import getColor from '../data/aqi'

//////////// POPUPS ////////////
/**
 * Returns stylized Ant Design html information given node data that as clicked.
 */
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

/**
 * From a data payload given by a click, decides what kind of popup data to return.  Currently, only supports a node that was clicked.
 */
export function popupCreator(data) {
    if(!data) return null;

    if (data.type === 'mapClick') {
        return null;
    } else {
        return nodePopupCreator(data)
    }
}
