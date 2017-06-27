import 'whatwg-fetch';

export default {
    getPostList(sort = '') {
        return function(dispatch) {
            fetch('/api/blogs?sort=' + sort)
                .then(function(response) {
                    response.json().then(function(postList) {
                        dispatch({
                            type: 'FETCH_POST_LIST',
                            posts: postList
                        });
                    });
                });
        }
    },

    getSideBarPosts() {
        return function(dispatch) {
            fetch('/api/blogs?sort=mystery&limit=5')
                .then(function(response) {
                    response.json().then(function(postList) {
                        dispatch({
                            type: 'FETCH_SIDE_PANEL_POSTS',
                            posts: postList
                        });
                    });
                });
        }
    }
};
