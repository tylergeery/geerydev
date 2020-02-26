import React from 'react'

import Project from './Project'

export default class ProjectList extends React.Component {
    render() {
        return <div>
            <div className="single-question double biggest pt-15 pl-0">Happenings</div>
        	{this.props.projects.map(function(proj) {
                return <Project key={proj._id} project={proj} />
            })}
        </div>
    }
}
