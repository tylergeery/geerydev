import React from 'react';

import PostSummary from './PostSummary';
import PageButton from './PageButton';

export default class PostList extends React.Component {
    render() {
        return (
            <div>
                {this.props.posts.map(function (post) {
                    return <PostSummary key={post._id} post={post} />;
                })}
                <div className="gd-pagination">
                    {this.props.forward ? <PageButton title="Next" page={this.props.page + 1} per_page={this.props.per_page} /> : ''}
                    {this.props.backward ? <PageButton title="Prev" page={this.props.page - 1} per_page={this.props.per_page} /> : ''}
                </div>
            </div>
        );
    }
}
