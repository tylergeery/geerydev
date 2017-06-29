import 'whatwg-fetch';
import storage from '../utils/storage'
import formData from '../utils/formData'

export default {

    getComments(blogId) {
        return function(dispatch) {
            fetch('/api/comments/' + blogId)
                .then(function(response) {
                    response.json().then(function(comments) {
                        dispatch({
                            type: 'FETCH_COMMENTS_COMPLETE',
                            comments: comments
                        })
                    })
                })
        }
    },

    submitComment(comment) {
        return (dispatch) => {
            return fetch('/api/comments', {
                method: 'POST',
                body: formData.getFromObject(comment)
            })
                .then((response) => {
                    dispatch(this.getComments(comment.blogId))
                })
        }
    },

    likeComment(comment) {
        const commentKey = 'like:' + comment._id

        if (storage.getKey(commentKey)) {
            // simulate complete
            return {
                type: 'LIKE_COMMENT_COMPLETE'
            }
        }

        storage.setKey(commentKey, 1)

        return (dispatch) => {
            fetch('/api/comments/like/' + comment._id)
                .then(() => {
                    dispatch(this.getComments(comment.blogId))
                })
        }
    },

    remove(id, blogId) {
        return (dispatch) => {
            return fetch('/api/comments/' + id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (blogId) {
                        dispatch(this.getComments(blogId))
                    }
                })
        }
    },
}
