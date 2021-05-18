import { connect } from 'react-redux';

import store from '../../store';
import Posts from '../../components/admin/posts';
import postActions from '../../actions/post';

const mapStateToProps = (state, ownProps) => (
    {
        posts: state.posts.list || []
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        submitAction(blogId, event) {
            if (this.state.toggle !== 'add') {
                event.stopPropagation();

                store.dispatch(postActions.remove(blogId))
                    .then(() => {
                        store.dispatch(postActions.getPostList('created', '_id'));
                    });
            }
        },

        sendEmail(blogId) {
            store.dispatch(postActions.sendEmail(blogId))
                .then((response) =>  {
                    console.log("send email response:", response);
                }, (err) => {
                    console.error("send email err:", err);
                });
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
            });
            window.scrollTo(0, 0);
        },

        toggleAddDelete() {
            this.setState({
                toggle: this.state.toggle === 'add' ? 'delete' : 'add'
            });
        }
    }
);

const AdminPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);

export default AdminPosts;
