import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
import NavBar from '../components/NavBar'
import generalActions from '../actions/general'

const mapStateToProps = (state, ownProps) => {
  return {
    quote: state.quotes[state.activeQuote] || '',
    showNav: state.showNav
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNavClick: () => {
      dispatch(generalActions.setShowNav(!ownProps.showNav))
    }
  }
}

const GeeryDevNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default GeeryDevNavBar
