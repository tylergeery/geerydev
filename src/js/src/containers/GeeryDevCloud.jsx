import { connect } from 'react-redux';

import Cloud from '../components/Cloud';
import cloudActions from '../actions/cloud';

const mapStateToProps = (state, ownProps) => (
    {
        searchResults: state.posts.searchResults
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        followPost(request) {
            window.location.href = '/requests/' + request._id;
        },

        search(event) {
            dispatch(cloudActions.queryPosts(event.target.value));
        }
    }
);

const GeeryDevCloud = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloud);

export default GeeryDevCloud;
