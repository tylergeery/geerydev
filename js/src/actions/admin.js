export default {
    getSubscribers() {
        return function(dispatch) {
            fetch('/api/subscribers', {
                credentials: 'include'
            })
                .then((response) => {
                    response.json().then((subscribers) => {
                        dispatch({
                            type: 'FETCH_SUBSCRIBERS_COMPLETE',
                            subscribers: subscribers
                        })
                    })
                })
        }
    },

    getUsers() {
        return function(dispatch) {
            fetch('/api/users', {
                credentials: 'include'
            })
                .then((response) => {
                    response.json().then((users) => {
                        dispatch({
                            type: 'FETCH_USERS_COMPLETE',
                            users: users
                        })
                    })
                })
        }
    },

    createUser() {

    },

    updateUser() {

    },

    removeUser() {

    }
}
