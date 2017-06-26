import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
import HeadBar from '../components/HeadBar'

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // onClick: () => {
    //   dispatch(setVisibilityFilter(ownProps.filter))
    // }
  }
}

const GeeryDevHeadBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadBar)

export default GeeryDevHeadBar
