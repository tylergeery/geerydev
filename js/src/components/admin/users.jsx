import React from 'react'
import classNames from 'classnames'

export default class Users extends React.Component {
    render() {
        return <div className="col-xs-12" ng-show="editUsers">
        	<h2 className="text-muted">Edits Users</h2>
        	<table>
                <tbody>
                    <tr>
            			<th className="pad-box">Name</th>
            			<th className="pad-box">Email</th>
            			<th className="pad-box">Password</th>
            			<th className="pad-box">Delete</th>
            		</tr>
                    {this.props.users.map(function(user) {
                        return <tr key={user._id}>
                			<td className="pad-box">{user.name}</td>
                			<td className="pad-box">{user.email}</td>
                			<td className="pad-box">{user.hashedPassword}</td>
                			<td className="red-delete center point" onClick={this.props.deleteUser.bind(this, user._id)}>-</td>
                		</tr>
                    }.bind(this))}
                </tbody>
        	</table>
        </div>
    }
}
