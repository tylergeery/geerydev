import { connect } from 'react-redux';

import store from '../../store';
import Users from '../../components/admin/users';
import adminActions from '../../actions/admin';

const mapStateToProps = (state, ownProps) => (
    {
        users: state.users.list || []
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        deleteUser(userId) {
            store.dispatch(adminActions.removeUser(userId));
        }
    }
);

const AdminUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default AdminUsers;
