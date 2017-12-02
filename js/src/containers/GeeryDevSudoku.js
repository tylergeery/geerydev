import { connect } from 'react-redux';

import sudokuActions from '../actions/sudoku';

class Sudoku {
    constructor(board) {
        //TODO
        this.board = board;
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.board
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // TODO
    };
};

const GeeryDevCloud = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloud);

export default GeeryDevCloud;
