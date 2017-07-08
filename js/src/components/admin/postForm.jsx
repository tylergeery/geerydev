import React from 'react'

import FormComponent from '../common/FormComponent'

export default class PostForm extends FormComponent {
    constructor(props) {
        super(props)

        if (this.props.blog._id) {
            this.state._id = this.props.blog._id
            this.state.question = this.props.blog.question
        }
    }
    render() {
        return <div className="eighty form absolute top0">
            <form onSubmit={this.props.onSubmit.bind(this)} method="POST">
            	<span className="absolute right-corner pad-box point black-back white round" onClick={this.props.close.bind(this)}>
            		X
            	</span>
            	<h2 className="text-muted center">Post Controller</h2>
            	<div className="form-group pad-box">
            		<label for="question">Post Title:</label>
            		<input onKeyUp={this.saveState.bind(this)} type="text" className="form-control" name="question" defaultValue={this.props.blog.question} />
            	</div>
            	<div className="form-group pad-box">
            		<label>
                        Asked By:
                        <input onKeyUp={this.saveState.bind(this)} type="text" className="form-control" name="askedBy" defaultValue={this.props.blog.askedBy} />
                    </label>
            	</div>
            	<div className="form-group pad-box">
            		<label>
                        Response Content
                    </label>
                    <textarea onKeyUp={this.saveState.bind(this)} className="form-control min300" name="response" defaultValue={this.props.blog.response}></textarea>
            	</div>
            	<div>
            		<button type="submit" className="form-control silver-back">
                        Save Post
            		</button>
            	</div>
            </form>
        </div>

    }
}
