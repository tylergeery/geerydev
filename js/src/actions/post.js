import 'whatwg-fetch';
import formData from '../utils/formData';

export default {
    getPostList(sort = '', exists = '', page = 1, perPage = 10) {
        return (dispatch) => (
            new Promise((resolve, reject) => {
                fetch('/api/blogs?sort=' + sort + '&exists=' + exists + '&page=' + page + '&per_page=' + perPage)
                    .then(response => {
                        response.json().then((postList) => {
                            dispatch({
                                type: 'FETCH_POST_LIST',
                                posts: postList
                            });

                            resolve({ posts: postList });
                        });
                    });
            })
        );
    },

    getSideBarPosts() {
        return (dispatch) => {
            fetch('/api/blogs?sort=mystery&limit=5')
                .then((response) => {
                    response.json().then((postList) => {
                        dispatch({
                            type: 'FETCH_SIDE_PANEL_POSTS',
                            posts: postList
                        });
                    });
                });
        };
    },

    setBlogId(blogId) {
        return {
            type: 'SET_BLOG_ID',
            blogId: blogId
        };
    },

    create(postInfo) {
        return (dispatch) => (
            fetch('/api/blogs', {
                method: 'POST',
                body: formData.getFromObject(postInfo),
                credentials: 'include'
            })
                .then((response) => {
                    response.json().then((post) => {
                        dispatch({
                            type: 'POST_CREATED',
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
                body: formData.getFromObject(postInfo),
                credentials: 'include'
            })
                .then((response) => {
                    response.json().then((post) => {
                        dispatch({
                            type: 'POST_UPDATED',
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
                            type: 'POST_DELETED',
                            post: post
                        });
                    });
                })
        );
    }

};
