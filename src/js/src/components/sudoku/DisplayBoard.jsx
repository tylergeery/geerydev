import React from 'react';
import classNames from 'classnames';

class DisplayBoard extends React.Component {
    constructor(props) {
        super(props);

        this.getClassNames = this.getClassNames.bind(this);
    }

    render() {
        return (
            <table className={classNames(this.props.action, 'gd-sudoku-table')}>
                <tbody>
                    {this.props.currentBoard.map((row, idx) => (
                        <tr key={idx}>
                            {row.map((col, colIdx) => (
                                <td key={colIdx} className={classNames(this.getClassNames(idx, colIdx))}>{+col ? col : ''}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    getClassNames(rowIdx, colIdx) {
        return {
            added: (+this.props.currentBoard[rowIdx][colIdx] && !(+this.props.previousBoard[rowIdx][colIdx])),
            og: +this.props.originalBoard[rowIdx][colIdx],
            removed: (!(+this.props.currentBoard[rowIdx][colIdx]) && +this.props.previousBoard[rowIdx][colIdx])
        };
    }
}
export default DisplayBoard;
