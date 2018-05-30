import actions from './constants';
import quip from '../logic/classifier/quips';

export default {
    classify(query) {
        if (!query) {
            return {
                type: actions.classifierFetchError,
                error: 'Please enter a search query'
            };
        }

        return function (dispatch) {
            dispatch({
                type: actions.classifierFetchActive
            });

            return fetch('/api/geerdev-tibw-classifier?query=' + encodeURIComponent(query))
                .then((response) => {
                    response.json().then(({ pred, conf }) => {
                        dispatch({
                            type: actions.classifierFetchComplete,
                            pred,
                            conf,
                            result: {
                                query,
                                quip: quip(pred, conf)
                            }
                        });

                        setTimeout(() => {
                            dispatch({
                                type: actions.classifierResultsActive
                            });
                        }, 800);
                    });
                }, (err) => {
                    dispatch({
                        type: actions.classifierFetchError,
                        error: 'Something went wrong. Please try again'
                    });
                });
        };
    }
};
