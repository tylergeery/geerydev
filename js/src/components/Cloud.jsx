import React from 'react';
import classNames from 'classnames';

import string from '../utils/string';
import time from '../utils/time';

export default class Cloud extends React.Component {
    render() {
        return (
            <div className="cloud-search-holder">
                <input className="cloud-search weak" placeholder="Tyler search" onChange={this.props.search} />
                <div className={classNames('search-results absolute', { hide: !this.props.searchResults.length })}>
                    {this.props.searchResults.map((result) => (
                        <div key={result._id} className="search-result point" onClick={this.props.followPost.bind(this, result)}>
                            <span className="jumbo-date inline">
                                {time.iso8601ToDay(result.created)}
                                <br />
                                <span className="search-small">
                                    {time.iso8601ToPretty(result.created)}
                                </span>
                            </span>
                            <div className="search-info inline">
                                {string.truncate(result.question, 20)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
