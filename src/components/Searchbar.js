import React from 'react'
import { Input } from 'antd';

const Search = Input.Search;

class Searchbar extends React.Component {
    render() {
        return (
            <div className="absolute top left ml12 mt12 bg-white shadow-darken10 z1">
                <Search
                    size="large"
                    placeholder="Search"
                    onSearch={value => console.log(value)}
                    enterButton
                />
            </div>
        )
    }
}

Searchbar.propTypes = {
    
}

export default Searchbar;
