import { connect } from 'react-redux';

import Panel from '../components/Panel';
import panelActions from '../actions/panel';
import postActions from '../actions/post';

const mapStateToProps = (state, ownProps) => {
    return {
        activePanel: state.activePanel,
        panelFilters: state.panelFilters,
        subscribeSuccess: state.subscribeSuccess
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTypeClick: (panel) => {
            dispatch(panelActions.toggleActivePanel(panel))
        },
        onSortSelect: (event) => {
            dispatch(postActions.getPostList(event.target.value))
        }
    }
}

const GeeryDevHomePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel)

export default GeeryDevHomePanel