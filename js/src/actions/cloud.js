import 'whatwg-fetch';

export default {
    queryPosts(search) {
        if (!search) {
            return {
                type: 'FETCH_POSTS',
                searchResults: []
            };
        }

        return function (dispatch) {
            return window.fetch('/api/blogs/search/' + encodeURIComponent(search))
                .then((response) => {
                    response.json().then((searchResults) => {
                        dispatch({
                            type: 'FETCH_POSTS',
                            searchResults: searchResults
                        });
                    });
                });
        };
    }
};
