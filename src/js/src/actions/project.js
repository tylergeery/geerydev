import actions from './constants';
import formData from '../utils/formData';

export default {
    getProjectList(sort = '') {
        return (dispatch) => (
            fetch('/api/projects')
                .then((response) => {
                    response.json().then((projectList) => {
                        dispatch(this.setProjectList(projectList));
                    });
                })
        );
    },

    setProjectList(projects) {
        return {
            type: actions.projectFetch,
            projects
        };
    },

    save(project) {
        return (dispatch) => (
            fetch('/api/projects', {
                credentials: 'include',
                method: project._id ? 'PUT' : 'POST',
                body: JSON.stringify(project),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
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
