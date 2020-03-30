import actions from './constants';

export default {
    getSubscribers() {
        return function (dispatch) {
            fetch('/api/subscribers', {
                credentials: 'include'
            })
                .then((response) => {
                    response.json().then((subscribers) => {
                        dispatch({
                            type: actions.subscribersFetchComplete,
                            subscribers: subscribers
                        });
                    });
                });
        };
    },

    getUsers() {
        return function (dispatch) {
            fetch('/api/users', {
                credentials: 'include'
            })
                .then((response) => {
                    response.json().then((users) => {
                        dispatch({
                            type: actions.usersFetchComplete,
                            users: users
                        });
                    });
                });
        };
    },

    createUser() {

    },

    updateUser() {

    },

    removeUser(userId) {

    },

    removeSubscriber(subscriberId) {

    }
};
