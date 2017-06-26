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
    }
};
