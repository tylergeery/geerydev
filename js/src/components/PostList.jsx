import React from 'react'
import { connect } from 'react-redux'

import PostSummary from './PostSummary'

export default class PostList extends React.Component {
    render() {
        return <div>
            {this.props.posts.map(function(post) {
                return <PostSummary key={post._id} post={post} />
            })}
        </div>
    }
}
