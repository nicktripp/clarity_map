import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Input, Card } from 'antd';

import { setSearchResults } from '../actions'

const Search = Input.Search;

var localSearchResults = [];

class Searchbar extends React.Component {
    search_debounce() {
        clearTimeout(this.delay)
        this.delay = setTimeout(() => {this.search()}, 500);
    }

    search(){
        const search_term = document.getElementById("search").value
        if (search_term.length <= 2) { return }

        const geo = this.props.geocoder

        console.log("Searching for '" + search_term + "'...")
        localSearchResults = geo.options.localGeocoder(search_term)

        geo.query(search_term)
    }

    render() {
        if (this.props.geocoder !== null && this.props.searchResults === null) {
            console.log("Setting results listener")
            this.props.geocoder.on("results", (results) => {
                const combined_features = localSearchResults.slice(0,3).concat(results.features.slice(0,3))
                results.features = combined_features
                this.props.setSearchResults(results)
            })
        }
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
                    id="search"
                    placeholder="Search"
                    size="large"
                    enterButton
                    onInput={() => { this.search_debounce() }}
                />
            </Card>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchResults: setSearchResults,
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    geocoder: state.geocoder,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
