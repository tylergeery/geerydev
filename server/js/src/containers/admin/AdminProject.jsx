import React from 'react'
import { connect } from 'react-redux'

import store from '../../store'
import projectActions from '../../actions/project'

class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        if (props.project._id) {
            this.state._id = props.project._id
        }
    }

    render() {
        return <tr key={this.props.project._id}>
            <td className="pad-box">
                <img src={this.props.project.image} alt={this.props.project.type} />
            </td>
            <td className="pad-box">
                <input type="text" name="title" defaultValue={this.props.project.title}
                    onChange={this.props.input.bind(this)} />
            </td>
            <td className="pad-box">
                <select name="type" defaultValue={this.props.project.type} onChange={this.props.input.bind(this)}>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="finance">Finance</option>
                </select>
            </td>
            <td className="pad-box">
                <input type="text" name="link" defaultValue={this.props.project.link}
                    onChange={this.props.input.bind(this)} />
            </td>
            <td>
                <textarea name="detail" className="pad-box" defaultValue={this.props.project.detail}
                    onChange={this.props.input.bind(this)} ></textarea>
            </td>
            <td className="pad-box point">
                <span className="center max50" onClick={this.props.save.bind(this)}>Save</span>
            </td>
            <td className="pad-box point">
                <span className="center max50" onClick={this.props.delete.bind(this)}>Delete</span>
            </td>
        </tr>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projects: state.projects || []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        save() {
            store.dispatch(projectActions.save(this.state))
        },

        delete() {
            store.dispatch(projectActions.remove(this.state._id))
        },

        input(event) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }
}

const AdminProject = connect(
    mapStateToProps,
    mapDispatchToProps
)(Project)

export default AdminProject
