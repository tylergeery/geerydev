import React from 'react';
import classNames from 'classnames';

class DisplayBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className={classNames(this.props.action, 'gd-sudoku-table')}>
                {this.props.board.map((row, idx) => (
                    <tr key={idx}>
                        {row.map((col, colIdx) => (
                            <td key={colIdx}>{col}</td>
                        ))}
                    </tr>
                ))}
            </table>
        );
    }
}
export default DisplayBoard;
