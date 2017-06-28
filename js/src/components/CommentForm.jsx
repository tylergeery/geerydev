import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import commentActions from '../actions/comment'
import store from '../store'

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <form onSubmit={this.onCommentSubmit.bind(this)} className='comment-form'>
            <div className="col-xs-12 col-sm-offset-1 col-sm-7 form-group mt-20">
        		<label>
                    Name
                    <input type="text" onKeyUp={this.saveState.bind(this)} className="form-control white-back" name="name" placeholder="Anonymous" />
                </label>
        	</div>
        	<div className="col-xs-12 col-sm-offset-1 col-sm-7 form-group">
        		<label>
                    Email
                    <input type="email" onKeyUp={this.saveState.bind(this)} className="form-control white-back" name="email" />
                </label>

        		<p className="info">Will only be used to notify you of replies</p>
        	</div>
        	<div className={classNames("col-xs-12 col-sm-offset-1 col-sm-9 form-group", {'has-error red': this.state.error})}>
        		<label for="content">
                    Reply {this.state.error || ''}
                    <textarea onKeyUp={this.saveState.bind(this)} className="form-control white-back min300" name="content"></textarea>
                </label>
        	</div>
        	<div className="col-xs-12 form-group mt-20">
        		<button type="submit" className="form-control white-back">
                    Submit Reply
        		</button>
        	</div>
        </form>
    }

    saveState(event) {
        let obj = {}
        obj[event.target.name] = event.target.value

        if (event.target.name === 'content' && event.target.value) {
            this.setState({error: null})
        }

        this.setState(obj)
    }

    onCommentSubmit(event) {
        let comment = _.extend(
            {
                blogId: this.props.blogId,
                responseTo: this.props.responseTo,
                responseHead: this.props.responseHead
            },
            this.state
        )

        event.preventDefault()

        if (!this.state.content) {
            this.setState({error: 'needs content'})
            return
        }

        this.setState({error: null})
        store.dispatch(commentActions.submitComment(comment))
            .done(() => {
                this.props.commentSubmitted()
            })
    }
}
