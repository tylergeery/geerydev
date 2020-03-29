import React from 'react'
import classNames from 'classnames'

export default class Project extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            <div className="project-tab-bar point" onClick={this.toggle.bind(this)}>
                <img className="fun-img" src={this.props.project.image} />
                {this.props.project.title}
            </div>
            <div className={classNames("project-tab-detail silver-back col-xs-12 big pad-box mt-10 mb-20", {'gd-hidden': !this.state.expanded})}>
                <span>{this.props.project.detail}</span>
                <p className="pad-box">
                    Follow the project <a href={this.props.project.link}>here...</a>
                </p>
            </div>
        </div>
    }

    toggle() {
        this.setState({expanded: !this.state.expanded})
    }
}
