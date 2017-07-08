import 'whatwg-fetch';
import formData from '../utils/formData'

export default {
    getProjectList(sort = '') {
        return function(dispatch) {
            return fetch('/api/projects')
                .then((response) => {
                    response.json().then(function(projectList) {
                        dispatch({
                            type: 'FETCH_PROJECT_LIST',
                            projects: projectList
                        });
                    });
                });
        }
    },

    save(project) {
        return (dispatch) => {
            return fetch('/api/projects', {
                credentials: 'include',
                method: project._id ? 'PUT' : 'POST',
                body: formData.getFromObject(project)
            })
                .then((response) => {
                    dispatch(this.getProjectList())
                })
        }
    },

    remove(_id) {
        return (dispatch) => {
            return fetch('/api/projects/' + _id, {
                credentials: 'include',
                method: 'DELETE'
            })
                .then((response) => {
                    dispatch(this.getProjectList())
                })
        }
    }
};
