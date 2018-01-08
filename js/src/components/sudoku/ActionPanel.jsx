import React from 'react';
import classNames from 'classnames';

class ActionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <button classNames="btn btn-primary">Random Board</button>
                    <button classNames="btn btn-secondary">Input New Board</button>
                </div>
                <form>
                    <label>
                        Temp
                        <input name="temp" type="slider" />
                    </label>
                </form>
            </div>
        );
    }
}
export default ActionPanel;
