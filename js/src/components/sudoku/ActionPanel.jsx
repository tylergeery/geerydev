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
                    <div className="pad-box">
                        {this.props.action === 'edit'
                            ? (
                                <button className="btn btn-primary" onClick={this.props.setAction.bind(null, 'solve')}>
                                    Solve
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={this.props.solveRandomBoard}>
                                    Solve Random
                                </button>
                            )
                        }
                    </div>
                    <div className="pad-box">
                        {this.props.action === 'edit'
                            ? '' : (
                                <button className="btn btn-secondary" onClick={this.props.setAction.bind(null, 'edit')}>
                                    Input New Board
                                </button>
                            )
                        }
                    </div>
                </div>
                {/solve/g.test(this.props.action)
                    ? (
                        <form>
                            <label>
                                Depth
                                <input name="depth" type="slider" />
                            </label>
                            <label>
                                Speed
                                <input name="speed" type="slider" />
                            </label>
                        </form>
                    ) : ''
                }
            </div>
        );
    }
}

export default ActionPanel;
