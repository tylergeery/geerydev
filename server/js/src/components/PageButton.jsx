import React from 'react';

import url from '../utils/url';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.urlProps = {
            page: this.props.page,
            per_page: this.props.per_page
        };
    }

    render() {
        return (
            <a href={'/requests/' + url.queryStringFromObject(this.urlProps)} alt={this.props.title} rel="follow">{this.props.title}</a>
        );
    }
}
