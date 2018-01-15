import { connect } from 'react-redux';

import store from '../../store';
import PostForm from '../../components/admin/postForm';
import postActions from '../../actions/post';

const mapStateToProps = (state, ownProps) => (
    {
        blogs: state.posts || [],
        comments: state.comments || []
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        onSubmit: (event) => {
            event.preventDefault();

            if (!this.state.question) {
                let obj = {
                    question: 'Required'
                };
                this.setState({ error: obj });
                return;
            }

            this.setState({ error: {} });

            if (this.state._id) {
                store.dispatch(postActions.update(this.state._id, this.state))
                    .then(() => {
                        this.props.close();
                        store.dispatch(postActions.getPostList('created', '_id'));
                    });
            } else {
                store.dispatch(postActions.create(this.state))
                    .then(() => {
                        this.props.close();
                        store.dispatch(postActions.getPostList('created', '_id'));
                    });
            }
        }
    }
);

const AdminPostForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm);

export default AdminPostForm;
