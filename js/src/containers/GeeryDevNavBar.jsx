import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
import NavBar from '../components/NavBar'
import navActions from '../actions/navbar'

const mapStateToProps = (state, ownProps) => {
  return {
    quote: state.quotes[state.activeQuote] || '',
    showNav: state.showNav
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNavClick: () => {
      dispatch(navActions.setShowNav(!ownProps.showNav))
    }
  }
}

const GeeryDevNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default GeeryDevNavBar
