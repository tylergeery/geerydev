import React from 'react';
import classNames from 'classnames';

class InputBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className={classNames(this.props.action, 'gd-sudoku-table')}>
                {this.props.board.map((row, idx) => (
                    <tr key={idx}>
                        {row.map((col, colIdx) => (
                            <td key={colIdx}>
                                <input type="number" step="1" max="9" min="1" />
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        );
    }
}
export default InputBoard;
