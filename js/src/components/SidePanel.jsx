import React from 'react'

import SidePanelPost from './SidePanelPost';

export default class SidePanel extends React.Component {
    render() {
        return <div>
        	<h3 className="strategic black-back white pad-box small-radius">
                Popular Posts
            </h3>
            {this.props.sidePanelPosts.map(function(post) {
                return <SidePanelPost key={post._id} post={post} />
            })}
        </div>
    }
}
