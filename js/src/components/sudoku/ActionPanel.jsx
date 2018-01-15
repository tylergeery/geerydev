import React from 'react';
import classNames from 'classnames';

class ActionPanel extends React.Component {
    constructor(props) {
        super(props);

        this.updateSpeed = this.updateSpeed.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <p>{this.props.stepsRemaining ? this.props.stepsRemaining + ' Steps Remaining' : ''}</p>
                    <div className="pad-box">
                        {this.props.action === 'edit'
                            ? (
                                <button className="btn btn-primary" onClick={this.props.solveInput}>
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
                            ? (
                                <button className="btn btn-secondary" onClick={this.props.clearInput}>
                                    Clear
                                </button>
                            ) : (
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
                                <input name="speed" type="range" min="1" max="10" onChange={this.updateSpeed} />
                            </label>
                        </form>
                    ) : ''
                }
            </div>
        );
    }

    updateSpeed(event) {
        this.props.setSpeed(525 - (+event.target.value * 50));
    }
}

export default ActionPanel;
