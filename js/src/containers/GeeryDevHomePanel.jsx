import { connect } from 'react-redux';

import Panel from '../components/Panel';
import panelActions from '../actions/panel';
import postActions from '../actions/post';

const mapStateToProps = (state, ownProps) => (
    {
        activePanel: state.panels.activePanel,
        panelFilters: state.panels.panelFilters,
        subscribeSuccess: state.subscribeSuccess
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        onTypeClick: (panel) => {
            dispatch(panelActions.toggleActivePanel(panel));
        },

        onSortSelect: (event) => {
            dispatch(postActions.getPostList(event.target.value));
        }
    }
);

const GeeryDevHomePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel);

export default GeeryDevHomePanel;
