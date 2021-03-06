import actions from './constants';
import arrayUtils from '../utils/array';
import Board from '../logic/sudoku/Board';
import store from '../store';

export default {
    clearInput() {
        return {
            type: actions.sudokuSetInput,
            input: ''
        };
    },

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

    setAllowedDepth(depth) {
        return {
            type: actions.sudokuSetAllowedDepth,
            depth
        };
    },

    setCurrentBoard(currentBoard) {
        return {
            type: actions.sudokuSetCurrentBoard,
            currentBoard
        };
    },

    /**
     * @return {Object}
     */
    setBoard() {
        let state = store.getState();

        try {
            let board = new Board(arrayUtils.to2DArrayFromString(state.sudoku.input));
            board.validate();

            return {
                type: actions.sudokuSetBoard,
                board: actions.board
            };
        } catch (e) {
            return {
                type: actions.sudokuSetBoardError,
                error: e.getMessage()
            };
        }
    },

    setSpeed(speed) {
        return {
            type: actions.sudokuSetSpeed,
            speed
        };
    },

    solveInput() {
        return {
            type: actions.sudokuSolveInput
        };
    },

    /**
     * @return {Object}
     */
    solveRandomBoard() {
        return {
            type: actions.sudokuSolveRandomBoard
        };
    },

    validateInput(input) {
        try {
            let board = new Board(input);
            board.validate();

            return {
                type: actions.sudokuSetInput,
                input
            };
        } catch (e) {
            return {
                type: actions.sudokuSetBoardError,
                error: e.getMessage()
            };
        }
    }
};
