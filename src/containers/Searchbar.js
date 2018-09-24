import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Input, Card } from 'antd';

import { setSearchResults } from '../actions'
import ResultList from '../containers/ResultList'

const Search = Input.Search;

var localSearchResults = [];

class Searchbar extends React.Component {

    /**
     * A wrapper for search().
     * Debounces searchbar input, so we make fewer requests while a user is still typing.
     */
    search_debounce() {
        clearTimeout(this.delay)
        this.delay = setTimeout(() => {this.search()}, 500);
    }

    /**
     * Searches map geocoder for the query found in this Searchbar. It does this in two steps:
     *      1) Searches our localGeocoder over our nodes, and saves the result in a temporary variable.
     *      2) Submits a query to search the mapbox geocoder.
     *  After this, these results are combined in the geocoder.on("results") callback defined once in the render() method below.
     *
     * NOTE: The searchData stores ONLY the top 3 results each from node data and world data.
     */
    search(){
        const search_term = document.getElementById("search").value
        if (search_term.length < 2) { return }

        const geo = this.props.geocoder

        console.log("Searching for '" + search_term + "'...")
        localSearchResults = geo.options.localGeocoder(search_term)

        geo.query(search_term)
    }

    render() {
        // Finishes geocoder setup.  Pro
        if (this.props.geocoder !== null && this.props.searchResults === null) {
            // Provide a callback to combine local & global geocoder results into one, and then set the searchResults property.
            this.props.geocoder.on("results", (searchResults) => {
                const combined_features = localSearchResults.slice(0,3).concat(searchResults.features.slice(0,3))
                searchResults.features = combined_features
                this.props.setSearchResults(searchResults)
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
                <div id="searchContainer">
                    <Search
                        autoComplete="off"
                        id="search"
                        placeholder="Search"
                        size="large"
                        enterButton
                        onInput={() => { this.search_debounce() }}
                    />
                    <ResultList className="resultList" />
                </div>
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
