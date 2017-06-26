import { connect } from 'react-redux';

import Cloud from '../components/Cloud';
import cloudActions from '../actions/cloud';

const mapStateToProps = (state, ownProps) => {
  return {
      searchResults: state.searchResults
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        followPost(request) {
            window.location.href = '/requests/' + request._id;
        },
        search(event) {
            dispatch(cloudActions.queryPosts(event.target.value));
        }
    }
}

const GeeryDevCloud = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloud)

export default GeeryDevCloud
