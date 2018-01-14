import React from 'react';
import classNames from 'classnames';

import CommentForm from './CommentForm';
import store from '../store';
import commentActions from '../actions/comment';
import time from '../utils/time';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={classNames('single-comments col-xs-12 col-sm-offset-1 col-sm-8 overwrite',
                    { indent: (this.props.comment.responseTo && this.props.comment.responseTo !== this.props.comment.blogId) }) }>
                <div className="col-xs-2 col-lg-1">
                        <img className="point shooter pad-0" src="images/1ca9ae8c.point.png" onClick={this.submitLike.bind(this, this.props.comment._id)} />
                        <br />
                        {this.props.comment.likes} Like{this.props.comment.likes > 1 ? 's' : ''}
                </div>
                <p className={classNames('single-comment pl-30 col-xs-10 col-lg-11', { highlight:  this.props.comment._id === this.props.activeComment })}
                    onMouseOver={this.setHeadComment.bind(this)}>
                    {this.props.comment.content}
                </p>
                <div className="clear">
                    <div className="text-muted col-xs-10 col-xs-offset-2 col-lg-11 col-lg-offset-1">
                        {time.iso8601ToFullReadable(this.props.comment.created)} - {this.props.comment.name} - <span className="comments-total point" onClick={this.toggleCommenting.bind(this)}>Reply</span>
                    </div>
                    <div className={classNames('col-xs-12 col-sm-11 col-sm-offset-1 gd-fade-down-in silver-back clear', { 'gd-hidden': !this.state.commenting })}>
                        <CommentForm commentSubmitted={this.closeCommenting.bind(this)}
                                blogId={this.props.comment.blogId} responseTo={this.props.comment._id}
                                responseHead={this.props.comment.responseHead} />
                    </div>
                </div>
            </div>
        );
    }

    submitLike() {
        store.dispatch(commentActions.likeComment(this.props.comment));
    }

    toggleCommenting() {
        this.setState({ commenting: !this.state.commenting });
    }

    closeCommenting() {
        this.setState({ commenting: false });
    }

    setHeadComment() {
        this.props.onCommentHover(this.props.comment.responseTo);
    }
}
