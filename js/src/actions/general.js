import 'whatwg-fetch';
import formData from '../utils/formData'

export default {
    setShowNav() {
        return {
            type: 'SET_SHOW_NAV'
        };
    },

    subscribe(body) {
        return (dispatch) => {
            return fetch('/api/subscribe', {
                method: 'POST',
                body: formData.getFromObject(body)
            })
                .then((response) => {
                    dispatch({
                        type: 'USER_SUBSCRIBED'
                    })
                })
        }
    }
}
