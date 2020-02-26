import React from 'react';

import time from '../../utils/time';
import store from '../../store';
import postActions from '../../actions/post';
import commentActions from '../../actions/comment';

export default class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        store.dispatch(postActions.getPostList())
            .then(function (response) {
                if (!response.posts || !response.posts.length) {
                    return;
                }

                store.dispatch(commentActions.setPostId(response.posts[0]._id));
                store.dispatch(commentActions.getComments(response.posts[0]._id));
            });
    }

    render() {
        return (
            <div className="col-xs-12">
            	<h2 className="text-muted">Approve Comments</h2>
            	<select onChange={this.props.setActiveBlog.bind(this)} value={this.props.activeBlog}>
                    {this.props.blogs.map(function (b) {
                        return <option key={b._id} value={b._id}>{b.question}</option>;
                    }.bind(this))}
            	</select>
            	<table>
                    <tbody>
                		<tr>
                			<th className="pad-box">ID</th>
                			<th className="pad-box">Name</th>
                			<th className="pad-box">Content</th>
                			<th className="pad-box">Email</th>
                			<th className="pad-box">Created</th>
                			<th className="pad-box">Delete</th>
                		</tr>
                        {this.props.comments.map(function (c) {
                            return (
                                <tr key={c._id}>
                        			<td className="pad-box">{c._id}</td>
                        			<td className="pad-box">{c.name}</td>
                        			<td className="pad-box">{c.content}</td>
                        			<td className="pad-box">{c.email}</td>
                        			<td className="pad-box">{time.iso8601ToFullReadable(c.created)}</td>
                        			<td className="pad-box point">
                                        <span className="red-delete center max50" onClick={this.props.deleteComment.bind(this, c._id, c.blogId)}>-</span>
                                    </td>
                        		</tr>
                            );
                        }.bind(this))}
                    </tbody>
            	</table>
            </div>
        );
    }
}
