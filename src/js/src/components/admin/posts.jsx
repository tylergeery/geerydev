import React from 'react';
import classNames from 'classnames';

import time from '../../utils/time';
import AdminPostForm from '../../containers/admin/AdminPostForm';
import store from '../../store';
import postActions from '../../actions/post';

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: 'add',
            showPostForm: false,
            post: null
        };
    }

    componentWillMount() {
        store.dispatch(postActions.getPostList('created', '_id', 1, 50));
    }

    render() {
        return (
            <div className="col-xs-12">
            	<h2 className="text-muted">
            		Create a New Post
            		<span className="pull-right point" onClick={this.props.toggleAddDelete.bind(this)}>Toggle</span>
            	</h2>
            	<p className="text-muted black-back post-pad point" onClick={this.props.showPostForm.bind(this)}>
            		Make a new post & question
            		<span className="pull-right blue-add">+</span>
            	</p>
                {this.props.posts.map((post) => {
                    return <div key={post._id} className="text-muted">
                		<p className={classNames('post-pad point', { 'silver-back': !!post.response })} onClick={this.props.showPostForm.bind(this, post)}>
                			{post.question} - {time.iso8601ToFullReadable(post.created)}
                			<span onClick={this.props.submitAction.bind(this, post._id)} className={classNames('pull-right',
                                { 'blue-add': this.state.toggle === 'add', 'red-delete': this.state.toggle !== 'add' })}>
                                    {this.state.toggle === 'add' ? '+' : '-'}
                            </span>
                            {post.response ? (
                                <span class="pull-right">
                                    <button type="button" onClick={this.props.sendEmail.bind(this, post._id)}>Email</button>
                                </span>
                            ) : ''}
                		</p>
                	</div>
                })}

                {this.state.showPostForm
                    ? <AdminPostForm blog={this.state.post || {}} close={this.props.closePostForm.bind(this)} />
                    : ''}
            </div>
        );
    }
}
