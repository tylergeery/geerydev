import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import generalActions from '../actions/general';

const mapStateToProps = (state, ownProps) => (
    {
        quote: state.nav.quotes[state.nav.activeQuote] || '',
        showNav: state.nav.showNav
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        onNavClick: () => {
            dispatch(generalActions.setShowNav(!ownProps.showNav));
        }
    }
);

const GeeryDevNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default GeeryDevNavBar;
