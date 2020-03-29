import React from 'react';

import string from '../utils/string';
import time from '../utils/time';

export default class SidePanel extends React.Component {
    render() {
        return (
            <div className="point black-border-bottom pad-box center overflow-hidden"
                onClick={this.followPost.bind(this, this.props.post._id)}>
                {string.truncate(this.props.post.question, 40)}
                <div className="pull-right white black-back small-radius cal-date-box">
                    {time.iso8601ToDay(this.props.post.created, true)}
                    <br />
                    {time.iso8601ToPretty(this.props.post.created)}
                </div>
            </div>
        );
    }

    followPost(postId) {
        window.location.href = '/requests/' + postId;
    }
}
