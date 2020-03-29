import React from 'react'
import classNames from 'classnames'

import time from '../../utils/time'
import store from '../../store'
import adminActions from '../../actions/admin'
import Project from '../../containers/admin/AdminProject'

export default class Posts extends React.Component {

    componentWillMount() {
        this.props.fetch()
    }

    render() {
        return <div className="col-xs-12">
        	<h2 className="text-muted">Projects</h2>
        	<table className="admin-projects">
                <tbody>
                    <tr>
            			<th className="pad-box">Image</th>
            			<th className="pad-box">Title</th>
            			<th className="pad-box">Type</th>
            			<th className="pad-box">Link</th>
            			<th className="pad-box">Detail</th>
            		</tr>
                    {this.props.projects.map(function(p) {
                        return <Project project={p} key={p._id}/>
                    })}
            		<Project project={{}} />
                </tbody>
        	</table>
        </div>
    }
}
