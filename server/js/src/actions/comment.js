import actions from './constants';
import storage from '../utils/storage';
import formData from '../utils/formData';

export default {
    /**
     * Get comments for a given blog post
     * @param {int} blogId
     */
    getComments(blogId) {
        return function (dispatch) {
            fetch('/api/comments/' + blogId)
                .then(function (response) {
                    response.json().then(function (comments) {
                        dispatch({
                            type: actions.commentsFetchComplete,
                            comments: comments
                        });
                    });
                });
        };
    },

    setPostId(postId) {
        return {
            type: actions.commentsSetPostId,
            postId: postId
        };
    },

    submitComment(comment) {
        return (dispatch) => (
            fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    dispatch(this.getComments(comment.blogId));
                })
        );
    },

    likeComment(comment) {
        const commentKey = 'like:' + comment._id;

        if (storage.getKey(commentKey)) {
            // simulate complete
            return {
                type: actions.commentsLikeComplete
            };
        }

        storage.setKey(commentKey, 1);

        return (dispatch) => {
            fetch('/api/comments/like/' + comment._id)
                .then(() => {
                    dispatch(this.getComments(comment.blogId));
                });
        };
    },

    remove(id, blogId) {
        return (dispatch) => (
            fetch('/api/comments/' + id, {
                credentials: 'include',
                method: 'DELETE'
            })
                .then((response) => {
                    if (blogId) {
                        dispatch(this.getComments(blogId));
                    }
                })
        );
    },
};
