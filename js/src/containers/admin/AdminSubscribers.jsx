import { connect } from 'react-redux';

import store from '../../store';
import Subscribers from '../../components/admin/subscribers';
import adminActions from '../../actions/admin';

const mapStateToProps = (state, ownProps) => (
    {
        subscribers: state.subscribers.list || []
    }
);

const mapDispatchToProps = (dispatch, ownProps) => ({});

const AdminSubscribers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscribers);

export default AdminSubscribers;
