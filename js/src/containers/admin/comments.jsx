import { connect } from 'react-redux';

import Comments from '../../components/admin/comments';
import store from '../../store';
import commentActions from '../../actions/comment';

const mapStateToProps = (state, ownProps) => (
    {
        blogs: state.posts.list || [],
        comments: state.comments.list || []
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        setActiveBlog: function (event) {
            store.dispatch(commentActions.setPostId(event.target.value));
            store.dispatch(commentActions.getComments(event.target.value));
        },

        deleteComment: function (commentId, blogId) {
            store.dispatch(commentActions.remove(commentId, blogId))
                .then(function () {
                    store.dispatch(commentActions.getComments(blogId));
                });
        }
    }
);

const AdminComments = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);

export default AdminComments;
