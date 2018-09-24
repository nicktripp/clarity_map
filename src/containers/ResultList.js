import React from 'react'
import { Select } from 'antd'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { setSearchResults, highlightAndFlyToPt } from '../actions'

const Option = Select.Option

/**
 * Holds the result of our geocode search.
 */
class ResultList extends React.Component {
    getContainer(triggerNode) {
        return document.getElementById("searchContainer")
    }

    /**
     * On selecting a result from the list, this function is called.  The callback 1) sets the search text to the selected feature, 2) empties the results list, and 3) signals our app to fly-to the selected feature.
     */
    handleChange(selectedResult) {
        // Fill In Searchbar with selection
        document.getElementById("search").value = selectedResult.label

        const feature = this.props.searchResults.features.filter((result) => {
            return result.id.toString() === selectedResult.key
        })[0]

        const coords = feature.geometry.coordinates
        const isNode = feature.properties.type !== undefined && feature.properties.type === "node"

        // Move map and highlight specified point
        this.props.highlightAndFlyToPt({coords, isNode})
        // Clear search results upon entry
        this.props.setSearchResults(null)
    }

    /**
     * If there are no searchResults (we haven't typed anything), display nothing.
     * NOTE: the default <Select> tag has a `visibility: hidden` as defined in index.css, in favor of the results list being attached to our searchBar.
     */
    render () {
        const { searchResults } = this.props
        if (searchResults !== null) {
            return  (
                <Select
                    open={true}
                    labelInValue
                    onChange={(value) => { this.handleChange(value) }}
                    className="resultList"
                    getPopupContainer={this.getContainer}
                >
                    {searchResults.features.map((result) => (
                        <Option
                            key={result.id}
                            coordinates={result.geometry.coordinates}
                            properties={result.properties}
                            className="result"
                        >
                            {result.place_name}
                        </Option>
                    ))}
                </Select>)
        }

        return ""
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSearchResults: setSearchResults,
        highlightAndFlyToPt: highlightAndFlyToPt,
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);
