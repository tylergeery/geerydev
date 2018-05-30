import React from 'react';
import classNames from 'classnames';

import CommentForm from './CommentForm';

export default class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="point" onClick={this.toggleCommenting.bind(this)}>
            		<span className={classNames('black-back round white rl-p10 center', { hide: this.state.commenting })}>+</span>
            		<span className={classNames('black-back round white rl-p10 center', { hide: !this.state.commenting })}>-</span>
            		<span className="rl-p10">{this.state.commenting ? 'Reply' : 'Click to Reply'}</span>
            	</div>
                <div className={classNames('gd-fade-down-in form', { 'gd-hidden': !this.state.commenting })}>
                    <CommentForm commentSubmitted={this.closeCommenting.bind(this)}
                            blogId={this.props.blogId} responseTo={this.props.blogId} responseHead={this.props.blogId} />
                </div>
            </div>
        );
    }

    toggleCommenting() {
        this.setState({ commenting: !this.state.commenting });
    }

    closeCommenting() {
        this.setState({ commenting: false });
    }
}
