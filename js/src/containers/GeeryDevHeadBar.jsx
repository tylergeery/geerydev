import { connect } from 'react-redux'

import HeadBar from '../components/HeadBar'

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

const GeeryDevHeadBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadBar)

export default GeeryDevHeadBar
