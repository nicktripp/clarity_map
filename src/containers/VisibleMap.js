import { connect } from 'react-redux'
import Map from '../components/Map'

const mapStateToProps = state => {
    return {
        map: state.map
    }
}

// const mapDispatchToProps = dispatch => {
//     return {}
// }

const VisibleMap = connect(
    mapStateToProps,
    // mapDispatchToProps,
)(Map)

export default VisibleMap
