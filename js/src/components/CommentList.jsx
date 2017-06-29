import React from 'react'
import classNames from 'classnames'

import Comment from './Comment'
import commentActions from '../actions/comment'
import store from '../store'

export default class CommentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {activeComment: null}
    }

    render() {
        return <div onMouseLeave={this.setActiveComment.bind(this, null)}>
            {this.props.comments.map(function(comment) {
                return <Comment key={comment._id} blogId={comment.blogId} comment={comment}
                            activeComment={this.state.activeComment} onCommentHover={this.setActiveComment.bind(this)} />
                    }.bind(this))}
        </div>
    }

    setActiveComment(commentId) {
        this.setState({activeComment: commentId})
    }
}
