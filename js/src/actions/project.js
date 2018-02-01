import 'whatwg-fetch';

import actions from './constants';
import formData from '../utils/formData';

export default {
    getProjectList(sort = '') {
        return function (dispatch) {
            return fetch('/api/projects')
                .then((response) => {
                    response.json().then(function (projectList) {
                        dispatch({
                            type: actions.projectFetch,
                            projects: projectList
                        });
                    });
                });
        };
    },

    save(project) {
        return (dispatch) => (
            fetch('/api/projects', {
                credentials: 'include',
                method: project._id ? 'PUT' : 'POST',
                body: formData.getFromObject(project)
            })
                .then((response) => {
                    dispatch(this.getProjectList());
                })
        );
    },

    remove(_id) {
        return (dispatch) => (
            fetch('/api/projects/' + _id, {
                credentials: 'include',
                method: 'DELETE'
            })
                .then((response) => {
                    dispatch(this.getProjectList());
                })
        );
    }
};
