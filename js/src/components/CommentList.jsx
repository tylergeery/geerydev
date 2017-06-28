import React from 'react'
import classNames from 'classnames'

import Comment from './Comment'
import commentActions from '../actions/comment'
import store from '../store'

export default class CommentList extends React.Component {
    render() {
        return <div>
            {this.props.comments.map(function(comment) {
                return <Comment key={comment._id} blogId={comment.blogId} comment={comment} />
            })}
        </div>
    }
}
