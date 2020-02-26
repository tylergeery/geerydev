import React from 'react'
import classNames from 'classnames'

import FormComponent from '../common/FormComponent'
import store from '../../store'
import actions from '../../actions/general'

export default class SubscribeForm extends FormComponent {
    render() {
        return <form onSubmit={this.subscribe.bind(this)} className={classNames("form-group px16 pad-box", {'hide': this.props.activePanel !== 'filter'})}>
            {!this.state.success
                ? 'Get Emails for New posts...'
                : <div className="alert alert-warning">Careful what you wish for. Misguided opinions coming your way.</div>}
            <input onKeyUp={this.saveState.bind(this)} className={classNames("form-control subscribe", {required: this.state.error.email})} type="email" name="email" placeholder="Email" />
            <button type="submit" className="subscribe-button">Subscribe</button>
        </form>
    }

    subscribe(event) {
        event.preventDefault()

        if (!this.state.email) {
            let obj = {
                email: 'Required'
            }
            this.setState({error: obj})
            return
        }

        this.setState({error: {}})
        store.dispatch(actions.subscribe(this.state))
            .then(() => {
                this.setState({success: true})

                setTimeout(() => {
                    this.setState({success: false})
                }, 4000)
            })
    }
}
