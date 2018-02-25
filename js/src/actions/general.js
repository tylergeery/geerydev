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
                body: formData.getFromObject(body)
            })
                .then((response) => {
                    dispatch({
                        type: 'USER_SUBSCRIBED'
                    });
                })
        );
    }
};
