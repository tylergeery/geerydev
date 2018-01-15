import React from 'react';
import classNames from 'classnames';

class InputBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: Array.from(Array(81), () => null)
        };
    }

    render() {
        return (
            <table className={classNames(this.props.action, 'gd-sudoku-table')}>
                <tbody>
                    {this.props.currentBoard.map((row, idx) => (
                        <tr key={idx}>
                            {row.map((col, colIdx) => (
                                <td key={colIdx}>
                                    <input type="text" name="row-{idx}-col-{colIdx}" onChange={this.inputEdit.bind(this, idx * 9 + colIdx)}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    inputEdit(idx, event) {
        let state = { inputs: this.state.inputs };
        state.inputs[idx] = event.target.value;

        this.setState({ inputs });

        this.props.validateInput(inputs.join(''));
    }
}
export default InputBoard;
