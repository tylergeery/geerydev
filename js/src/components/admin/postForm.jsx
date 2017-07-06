import React from 'react'

import FormComponent from '../common/FormComponent'

export default class PostForm extends FormComponent {
    render() {
        return <div className="eighty form absolute">
            <form onSubmit={this.props.onSubmit.bind(this)} method="POST">
            	<span className="absolute right-corner pad-box point black-back white round" onClick={this.props.close.bind(this)}>
            		X
            	</span>
            	<h2 className="text-muted center">Post Controller</h2>
            	<div className="form-group pad-box">
            		<label for="question">Post Title:</label>
            		<input onKeyUp={this.saveState.bind(this)} type="text" className="form-control" name="question" value={this.props.blog.question} />
            	</div>
            	<div className="form-group pad-box">
            		<label>
                        Asked By:
                        <input onKeyUp={this.saveState.bind(this)} type="text" className="form-control" name="askedBy" value={this.props.blog.askedBy} />
                    </label>
            	</div>
            	<div className="form-group pad-box">
            		<label>
                        Response Content
                        <textarea onKeyUp={this.saveState.bind(this)} className="form-control min300" name="response">
                            {this.props.blog.response}
                        </textarea>
                    </label>
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
