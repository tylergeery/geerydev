import { connect } from 'react-redux'

import store from '../../store'
import Projects from '../../components/admin/projects'
import projectActions from '../../actions/project'

const mapStateToProps = (state, ownProps) => {
    return {
        projects: state.projects || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetch() {
            store.dispatch(projectActions.getProjectList())
        }
    }
}

const AdminProjects = connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects)

export default AdminProjects
