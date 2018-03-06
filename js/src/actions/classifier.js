import actions from './constants';

export default {
    classify(query) {
        if (!query) {
            return {
                type: actions.classifierFetchError,
                error: 'Please enter a search query'
            };
        }

        return function (dispatch) {
            return fetch('/api/geerdev-tibw-classifier' + encodeURIComponent(search))
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
