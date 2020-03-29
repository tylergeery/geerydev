import React from 'react'
import classNames from 'classnames'

import time from '../../utils/time'
import store from '../../store'
import adminActions from '../../actions/admin'

export default class Posts extends React.Component {

    componentWillMount() {
        store.dispatch(adminActions.getSubscribers())
    }

    render() {
        return <div className="col-xs-12">
        	<h2 className="text-muted">Subscribers</h2>
        	<table>
                <tbody>
                    <tr>
            			<th className="pad-box">Email</th>
            			<th className="pad-box">Date</th>
            		</tr>
                    {this.props.subscribers.map(function(s) {
                        return <tr key={s._id}>
                			<td className="pad-box">{s.email}</td>
                			<td className="pad-box">{time.iso8601ToFullReadable(s.created)}</td>
                		</tr>
                    })};
                </tbody>
        	</table>
        </div>
    }
}
