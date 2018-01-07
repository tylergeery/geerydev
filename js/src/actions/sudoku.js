import actions from './constants';

export default {
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
    setRandomBoard() {
        return {
            type: actions.sudokuSetRandomBoard
        };
    }
};
