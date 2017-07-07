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
        },

        closePostForm() {
            this.setState({
                showPostForm: false
            });
        },

        showPostForm(post) {
            this.setState({
                showPostForm: true,
                post: post
            })
            window.scrollTo(0, 0)
        },

        toggleAddDelete() {
            this.setState({
                toggle: this.state.toggle === 'add' ? 'delete' : 'add'
            })
        }
    }
}

const AdminPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)

export default AdminPosts
