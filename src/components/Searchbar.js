import React from 'react'
import { Input, Card } from 'antd';

const Search = Input.Search;

class Searchbar extends React.Component {
    render() {
        return (
            <Card
                className="searchCard absolute top left ml24 mt6 round w360 shadow-darken10"
                bodyStyle={{padding: "8px"}} >
                <div id="searchHeader" className="mb6">
                    <img
                        className="searchLogo"
                        alt="openmap"
                        src="https://openmap.clarity.io/static/media/logo-clarity-rect-new.0210aaf8.png"
                    />
                    <div className="searchTitle inline-block">| nicktripp</div>
                </div>
                <Search
                    placeholder="Search"
                    onSearch={value => console.log(value)}
                    size="large"
                    enterButton
                />
            </Card>
        )
    }
}

Searchbar.propTypes = {

}

export default Searchbar;
