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
                <div className="col-sm-12">
                    <h3>{this.props.action.toUpperCase()}</h3>
                    {this.props.action === 'edit'
                        ? <InputBoard {...this.props} />
                        : <DisplayBoard {...this.props} />}
                </div>
                <div className="col-sm-12 center">
                    <ActionPanel {...this.props} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => (
    {
        action: state.sudoku.action,
        boardError: state.sudoku.boardError,
        currentBoard: state.sudoku.currentBoard,
        depth: state.sudoku.depth,
        input: state.sudoku.input,
        previousBoard: state.sudoku.previousBoard,
        originalBoard: state.sudoku.originalBoard,
        speed: state.sudoku.speed,
        stepsRemaining: state.sudoku.stepsRemaining
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        clearInput: () => {
            dispatch(sudokuActions.clearInput());
        },

        setAction: (action) => {
            dispatch(sudokuActions.setAction(action));
        },

        setAllowedDepth: (depth) => {
            dispatch(sudokuActions.setAllowedDepth(depth));
        },

        setSpeed: (speed) => {
            dispatch(sudokuActions.setSpeed(speed));
        },

        solveInput: () => {
            if (!ownProps.boardError) {
                dispatch(sudokuActions.solveInput());
            }
        },

        solveRandomBoard: () => {
            dispatch(sudokuActions.solveRandomBoard());
        },

        setSquare: (square, value) => {
            dispatch(sudokuActions.setSquare(square, value));
        },

        validateInput: (board) => {
            dispatch(sudokuActions.validateInput(board));
        }
    }
);

const GeeryDevSudoku = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sudoku);

export default GeeryDevSudoku;
