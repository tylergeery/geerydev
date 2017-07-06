import { connect } from 'react-redux'

import store from '../../store'
import Posts from '../../components/admin/posts'
import postActions from '../../actions/post'

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitAction: function(blogId, event) {
            if (this.state.toggle !== 'add') {
                event.stopPropagation()

                store.dispatch(postActions.remove(blogId))
            }
        }
    }
}

const AdminPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)

export default AdminPosts
