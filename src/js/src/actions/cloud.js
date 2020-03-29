import actions from './constants';

export default {
    queryPosts(search) {
        if (!search) {
            return {
                type: actions.postsFetchSearchResults,
                searchResults: []
            };
        }

        return function (dispatch) {
            return fetch('/api/blogs/search/' + encodeURIComponent(search))
                .then((response) => {
                    response.json().then((searchResults) => {
                        dispatch({
                            type: actions.postsFetchSearchResults,
                            searchResults
                        });
                    });
                });
        };
    }
};
