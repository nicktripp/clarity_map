import React from 'react'
import { Card, Tag } from 'antd';

class Legend extends React.Component {
    render() {
        return (
            <div className="legend absolute left shadow-darken10 bottom ml24 mb36 round">
                <Card bodyStyle={{padding: "8px"}}>
                    <div className="LegendTitle mb12">
                        <div>
                            US EPA <br />
                            PM2.5 AQI
                        </div>
                    </div>
                    <div className="legendChart">
                        <div className="legendRow">
                            <Tag className="legendTag" color="#00E400" />
                            <div className="legendTagLabel"> 0-50</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#FFFF00" />
                            <div className="legendTagLabel"> 50-100</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#FF7E00" />
                            <div className="legendTagLabel"> 100-150</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#FF0000" />
                            <div className="legendTagLabel"> 150-200</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#8F3F97" />
                            <span className="legendTagLabel"> 200-250</span>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#8F3F97" />
                            <div className="legendTagLabel"> 250-300</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#7E0023" />
                            <div className="legendTagLabel"> 300-350</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#7E0023" />
                            <div className="legendTagLabel"> 350-400</div>
                        </div>
                        <div className="legendRow">
                            <Tag className="legendTag" color="#7E0023" />
                            <div className="legendTagLabel"> 400-500</div>
                        </div>
                    </div>

                </Card>
            </div>
        )
    }
}

export default Legend;
