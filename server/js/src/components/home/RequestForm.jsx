import React from 'react';
import classNames from 'classnames';

import FormComponent from '../common/FormComponent';
import store from '../../store';
import postActions from '../../actions/post';

export default class RequestForm extends FormComponent {
    render() {
        return (
            <form onSubmit={this.ask.bind(this)} className={classNames("form-group px16 pad-box", {'hide': this.props.activePanel !== 'question'})}>
                {!this.state.success
                    ? 'Provoke me...'
                    : <div className="alert alert-info">You want it, you got it! Hold tight. Becoming an expert.</div>}
                <textarea className={classNames("min300 form-control dubs", {required: this.state.error.question, hide: this.state.success})}
                    onKeyUp={this.saveState.bind(this)} name="question"
                    placeholder={!this.state.error.question ? 'Ask me a question...' : 'Required'}></textarea>
                <input className={classNames("form-control m10", {hide: this.state.success})} onKeyUp={this.saveState.bind(this)} type="text" name="askedBy" placeholder="Anonymous" />
                <input className={classNames("form-control m10", {hide: this.state.success})} onKeyUp={this.saveState.bind(this)} type="text" name="email" placeholder="Email (Optional)" />
                <button type="submit" className={classNames({ hide: this.state.success })}>Provoke</button>
            </form>
        );
    }

    ask(event) {
        event.preventDefault();

        if (!this.state.question) {
            let obj = {
                question: 'Required'
            };
            this.setState({ error: obj });
            return;
        }

        this.setState({ error: {} });
        store.dispatch(postActions.create(this.state))
            .then(() => {
                this.setState({ success: true });

                setTimeout(() => {
                    this.setState({ success: false });
                }, 4000);
            });
    }
}
