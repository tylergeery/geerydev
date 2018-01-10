import React from 'react';
import GeeryDevCloud from '../containers/GeeryDevCloud';

export default class HeadBar extends React.Component {
    render() {
        return (
            <h3 className="text-muted">
                <a href="/requests">
                    <img className="prof-pic col-sm-offset-1"
                        src="https://www.gravatar.com/avatar/72fed696e67b00b5f49df7c70f60f74d.png" />
                </a>
                <span className="my-name">
                    GeeryDev
                </span>
                <img className="cloud" src="images/1df8f9b6.clouds.png" />
                <GeeryDevCloud />
            </h3>
        );
    }
};
