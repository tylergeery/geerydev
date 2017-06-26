import { connect } from 'react-redux';

import Panel from '../components/Panel';
import panelActions from '../actions/panel';

const mapStateToProps = (state, ownProps) => {
  return {
    activePanel: state.activePanel,
    panelFilters: state.panelFilters
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTypeClick: (panel) => {
      dispatch(panelActions.toggleActivePanel(panel))
    }
  }
}

const GeeryDevHomePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel)

export default GeeryDevHomePanel
