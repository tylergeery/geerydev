import { connect } from 'react-redux';

import SidePanel from '../components/SidePanel';

const mapStateToProps = (state, ownProps) => (
    {
        sidePanelPosts: state.posts.sidePanelPosts
    }
);

const GeeryDevSidePanel = connect(
  mapStateToProps
)(SidePanel);

export default GeeryDevSidePanel;
