import React from 'react';
import classNames from 'classnames';

class ActionPanel extends React.Component {
    constructor(props) {
        super(props);

        this.updateAllowedDepth = this.updateAllowedDepth.bind(this);
        this.updateSpeed = this.updateSpeed.bind(this);
    }

    render() {
        return (
            <div className="sudoku-action-panel">
                <div>
                    <p><b>{this.props.stepsRemaining ? this.props.stepsRemaining + ' Steps Remaining' : ''}</b></p>
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
                            <div className="col-xs-12 col-md-6">
                                <label>
                                    Depth
                                    <br/>
                                    <input name="depth" type="range" min="0" max="10" onChange={this.updateAllowedDepth} defaultValue="5"/>
                                    <br />
                                    {this.props.depth > 150 ? 10 : this.props.depth / 15}
                                </label>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <label>
                                    Speed
                                    <br/>
                                    <input name="speed" type="range" min="0" max="10" onChange={this.updateSpeed} defaultValue="5"/>
                                    <br />
                                    {(this.props.speed - 525) / (-50)}
                                </label>
                            </div>
                        </form>
                    ) : ''
                }
            </div>
        );
    }

    updateAllowedDepth(event) {
        let depth = +event.target.value;

        this.props.setAllowedDepth(depth === 10 ? 10000 : depth * 15);
    }

    updateSpeed(event) {
        this.props.setSpeed(525 - (+event.target.value * 50));
    }
}

export default ActionPanel;
