import React from 'react';
import classNames from 'classnames';

import string from '../utils/string';
import time from '../utils/time';

export default class PostSummary extends React.Component {
    render() {
        return <div className="blog-sum point clear">
    		<a className="blog-sum-back" href={'/requests/' + this.props.post._id}>
    			<div className="col-sm-1 black-back center white blog-date max-w-150">
    				{time.iso8601ToDay(this.props.post.created)}
    				<br />
    				<span className="search-smaller">
                        {time.iso8601ToPretty(this.props.post.created)}
                    </span>
    			</div>
    			<div className="col-xs-12 col-sm-10">
    				<h2 className="blog-title black">
    					{this.props.post.question}
    				</h2>
    				<p className="text-muted bigger">
    					Asked By: {this.props.post.askedBy} - {time.iso8601ToFullReadable(this.props.post.created)} -
    					<span className="comments-total">{this.props.post.totalComments} Comments </span>
    				</p>
    			</div>
    			<div className="col-xs-1 full-height hide-small">
    				<img src="images/a33e0727.blog-show.png" className="full-image" />
    			</div>
    		</a>
    	</div>
    }
}
