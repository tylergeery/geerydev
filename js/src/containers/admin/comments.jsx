import { connect } from 'react-redux'

import Comments from '../../components/admin/comments'
import store from '../../store'
import commentActions from '../../actions/comment'
import postActions from '../../actions/post'

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.posts || [],
        comments: state.comments || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setActiveBlog: function(event) {
            store.dispatch(postActions.setBlogId(event.target.value))
            store.dispatch(commentActions.getComments(event.target.value))
        },

        deleteComment: function(commentId, blogId) {
            store.dispatch(commentActions.remove(commentId, blogId))
                .then(function() {
                    store.dispatch(commentActions.getComments(blogId))
                })
        }
    }
}

const AdminComments = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)

export default AdminComments
