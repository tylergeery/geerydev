import React from 'react';
import classNames from 'classnames';

class InputBoard extends React.Component {
    render() {
        return (
            <div>
                {this.props.boardError ?
                    (<div className ="alert alert-danger">
                        <strong>Error!</strong> {this.props.boardError}.
                    </div>) : ''
                }
                <table className={classNames(this.props.action, 'gd-sudoku-table')}>
                    <tbody>
                        {this.props.currentBoard.map((row, idx) => (
                            <tr key={idx}>
                                {row.map((col, colIdx) => (
                                    <td key={colIdx}>
                                        <input type="text" name="row-{idx}-col-{colIdx}"
                                            onChange={this.inputEdit.bind(this, idx * 9 + colIdx)}
                                            defaultValue={this.props.input[idx * 9 + colIdx] || ''}/>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    inputEdit(idx, event) {
        this.props.input[idx] = +event.target.value;
        this.props.validateInput(this.props.input);
    }
}
export default InputBoard;
