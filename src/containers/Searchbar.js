import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Input, Card } from 'antd';

import { setSearchResults } from '../actions'
import ResultList from '../containers/ResultList'

const Search = Input.Search;

var localSearchResults = [];
var addedListener = false;

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
     */
    search(){

        // NOTE: Hacky way to stop early sesrching
        if (!this.props.mapStyle) {
            return;
        }

        var search_term = document.getElementById("search").value
        if (search_term === "") { search_term = " "}

        const geo = this.props.geocoder

        console.log("Searching for '" + search_term + "'...")
        localSearchResults = geo.options.localGeocoder(search_term).slice()

        geo.query(search_term)
    }

    render() {
        // Finishes geocoder setup.
        if (this.props.geocoder !== null && !addedListener) {
            // Provide a callback to combine local & global geocoder results into one, and then set the searchResults property.
            this.props.geocoder.on("results", (searchResults) => {
                const combined_features = localSearchResults.concat(searchResults.features)
                const new_results = Object.assign({}, searchResults, {features: combined_features})
                this.props.setSearchResults(new_results)
                localSearchResults = []
            })
            addedListener = true
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
                        onInput={() => { this.search_debounce() }}
                        onFocus={(query) => { this.search_debounce() } }
                        onBlur ={() => { this.props.setSearchResults(null) }}
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
    mapStyle: state.mapStyle,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
