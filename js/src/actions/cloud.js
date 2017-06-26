import 'whatwg-fetch';

export default {
    queryPosts(search) {
        if (!search) {
            return {
                type: 'FETCH_POSTS',
                searchResults: []
            };
        }

        return function(dispatch) {
            fetch('/api/blogs/search/' + encodeURIComponent(search))
                .then(function(response) {
                    response.json().then(function(searchResults) {
                        dispatch({
                            type: 'FETCH_POSTS',
                            searchResults: searchResults
                        });
                    });
                });
        }
    }
};
