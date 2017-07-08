import { connect } from 'react-redux'

import store from '../../store'
import Subscribers from '../../components/admin/subscribers'
import adminActions from '../../actions/admin'

const mapStateToProps = (state, ownProps) => {
    return {
        subscribers: state.subscribers || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

const AdminSubscribers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscribers)

export default AdminSubscribers
