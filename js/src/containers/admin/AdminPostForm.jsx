import { connect } from 'react-redux'

import store from '../../store'
import PostForm from '../../components/admin/postForm'
import postActions from '../../actions/post'

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.posts || [],
        comments: state.comments || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: function(event) {
            event.preventDefault()

            if (!this.state.question) {
                let obj = {
                    question: 'Required'
                }
                this.setState({error: obj})
                return
            }

            this.setState({error: {}})
            store.dispatch(postActions.create(this.state))
                .then(() => {
                    this.setState({success: true})

                    setTimeout(() => {
                        this.setState({success: false})
                    }, 4000)
                })
        },

        close: function() {
            this.setState({blogId: null})
        }
    }
}

const AdminPostForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm)

export default AdminPostForm
