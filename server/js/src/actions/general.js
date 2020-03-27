import actions from '../actions/constants';
import formData from '../utils/formData';

export default {
    setShowNav() {
        return {
            type: actions.navSetShowNav
        };
    },

    subscribe(body) {
        return (dispatch) => (
            fetch('/api/subscribe', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    dispatch({
                        type: 'USER_SUBSCRIBED'
                    });
                })
        );
    }
};
