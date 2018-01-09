import { connect } from 'react-redux';
import React from 'react';

import sudokuActions from '../actions/sudoku';
import ActionPanel from '../components/sudoku/ActionPanel';
import DisplayBoard from '../components/sudoku/DisplayBoard';
import InputBoard from '../components/sudoku/InputBoard';

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="col-sm-6">
                    <h3>{this.props.action.toUpperCase()}</h3>
                    {this.props.action === 'edit'
                        ? <InputBoard {...this.props} />
                        : <DisplayBoard {...this.props} />}
                </div>
                <div className="col-sm-6">
                    <ActionPanel {...this.props} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => (
    {
        board: state.sudoku.board,
        action: state.sudoku.action
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        setAction: (action) => {
            dispatch(sudokuActions.setAction(action));
        },

        setBoard: (board) => {
            dispatch(sudokuActions.setBoard(board));
        },

        setRandomBoard: () => {
            dispatch(sudokuActions.setRandomBoard());
        },

        setSquare: (square, value) => {
            dispatch(sudokuActions.setSquare(square, value));
        }
    }
);

const GeeryDevSudoku = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sudoku);

export default GeeryDevSudoku;
