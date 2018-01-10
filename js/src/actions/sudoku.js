import actions from './constants';

export default {
    /**
     * @param {string} action
     * @return {Object}
     */
    setAction(action) {
        return {
            type: actions.sudokuSetAction,
            action
        };
    },

    /**
     * @param {int} square
     * @param {int} value
     * @return {Object}
     */
    setSquare(square, value) {
        return {
            type: 'SET_SQUARE',
            square,
            value
        };
    },

    /**
     * @param {Object} board
     * @return {Object}
     */
    setBoard(board) {
        // TODO validate board
        if (false) {
            return {
                type: actions.sudokuSetBoardError,
                error: ' Invalid sudoku board. Needs correcting.'
            };
        }

        return {
            type: actions.sudokuSetBoard,
            board: board
        };
    },

    /**
     * @return {Object}
     */
    solveRandomBoard() {
        return {
            type: actions.sudokuSolveRandomBoard
        };
    }
};
