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
        let formData = FormData()
        let self = this

        _.forOwn(comment, function(value, prop) {
            formData.append(prop, value)
        })

        return function(dispatch) {
            fetch('/api/comments', {
                method: 'POST',
                body: formData
            })
                .then(function(response) {
                    dispatch(self.getComments(comment.blogId))
                })
        }
    }
}
