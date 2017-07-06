import { connect } from 'react-redux'

import store from '../../store'
import Users from '../../components/admin/users'
import adminActions from '../../actions/admin'

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteUser(userId) {
            store.dispatch(adminActions.removeUser(userId))
        }
    }
}

const AdminUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)

export default AdminUsers
