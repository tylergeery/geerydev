import React from 'react'
import classNames from 'classnames'

import CommentForm from './CommentForm'

export default class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className="single-comments col-xs-12 col-sm-offset-1 col-sm-8 double-indent" ng-class="{'indent': comment.responseTo == comment.responseHead, 'overwrite': comment._id == comment.responseHead}" ng-mouseover="$root.setFollow(comment.responseTo)">
            <div className="float-left">
                    <img className="point shooter" src="images/1ca9ae8c.point.png" onClick={this.submitLike.bind(this, this.props.comment._id)} />
                    <br />
                    {this.props.comment.likes} Likes
            </div>
            <p className="single-comment pl-30 float-left" ng-class="{'highlight':  comment._id == $root.follow}">
                {this.props.comment.content}
            </p>
            <div className="clear">
                <div className="text-muted">
                    {this.props.comment.created} - {this.props.comment.name}
                    - <span className="comments-total point" onClick={this.toggleCommenting.bind(this)}>Reply</span>
                </div>
                <div className={classNames("col-xs-12 col-sm-11 col-sm-offset-1 gd-fade-down-in silver-back clear", {'gd-hidden': !this.state.commenting})}>
                    <CommentForm commentSubmitted={this.closeCommenting.bind(this)}
                            blogId={this.props.blogId} responseTo={this.props.comment._id} responseHead={this.props.comment.responseHead} />
                </div>
            </div>

        </div>
    }

    submitLike() {

    }

    toggleCommenting() {
        this.setState({commenting: !this.state.commenting})
    }

    closeCommenting() {
        this.setState({commenting: false})
    }
}
