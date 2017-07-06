import 'whatwg-fetch';

export default {
    getProjectList(sort = '') {
        return function(dispatch) {
            fetch('/api/projects')
                .then(function(response) {
                    response.json().then(function(projectList) {
                        dispatch({
                            type: 'FETCH_PROJECT_LIST',
                            projects: projectList
                        });
                    });
                });
        }
    },

    remove(id) {
        return function(dispatch) {
            fetch('/api/projects/' + id + '/delete')
                .then((response) => {
                    this.getProjectList()
                })
        }
    }
};
