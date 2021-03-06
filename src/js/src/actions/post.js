import actions from './constants';
import formData from '../utils/formData';

export default {
    getPostList(sort = '', exists = '', page = 1, perPage = 10) {
        return (dispatch) => (
            new Promise((resolve, reject) => {
                fetch('/api/blogs?sort=' + sort + '&exists=' + exists + '&page=' + page + '&per_page=' + perPage)
                    .then(response => {
                        response.json().then((postList) => {
                            resolve(dispatch(this.setPostList(postList)));
                        });
                    });
            })
        );
    },

    /**
     * Set postLists
     *
     * @param {Object} posts
     */
    setPostList(posts) {
        return {
            type: actions.postsFetch,
            posts
        };
    },

    getSideBarPosts() {
        return (dispatch) => {
            fetch('/api/blogs?sort=mystery&limit=5')
                .then((response) => {
                    response.json().then((postList) => {
                        dispatch({
                            type: actions.postsFetchSidePanel,
                            posts: postList
                        });
                    });
                });
        };
    },

    sendEmail(blogId) {
        return (dispatch) => (
            fetch('/api/blogs/' + blogId + '/send', {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        );
    },

    create(postInfo) {
        return (dispatch) => (
            fetch('/api/blogs', {
                method: 'POST',
                body: JSON.stringify(postInfo),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    response.json().then((post) => {
                        dispatch({
                            type: actions.postCreated,
                            post: post
                        });

                        dispatch(this.getPostList());
                    });
                })
        );
    },

    update(id, postInfo) {
        return (dispatch) => (
            fetch('/api/blogs/' + id, {
                method: 'PUT',
                body: JSON.stringify(postInfo),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    response.json().then((post) => {
                        dispatch({
                            type: actions.postUpdated,
                            post: post
                        });
                    });
                })
        );
    },

    remove(id) {
        return (dispatch) => (
            fetch('/api/blogs/' + id, {
                credentials: 'include',
                method: 'DELETE'
            })
                .then((response) => {
                    response.json().then((post) => {
                        dispatch({
                            type: actions.postDeleted,
                            post: post
                        });
                    });
                })
        );
    }

};
