import actions from '../actions/constants';
import sudokuSeedData from '../logic/sudoku/seed';
import arrayUtils from '../utils/array';
import Solver from '../logic/sudoku/Solver';
import Board from '../logic/sudoku/Board';

let initialState = {
    action: 'Start',
    boardError: null,
    currentBoard: Array.from(Array(9), () => Array.from(Array(9), () => null)),
    depth: 75,
    input: Array.from(Array(81), () => 0),
    originalBoard: Array.from(Array(9), () => Array.from(Array(9), () => null)),
    previousBoard: Array.from(Array(9), () => Array.from(Array(9), () => null)),
    solver: null,
    speed: 275
};

export default function sudoku(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.sudokuSolveRandomBoard:
            var currentBoard = state.currentBoard.reduce((row, acc) => row + acc, ''),
                rand = Math.floor(Math.random() * sudokuSeedData.length);

            while (sudokuSeedData[rand] === currentBoard) {
                rand = Math.floor(Math.random() * sudokuSeedData.length);
            }

            let board = arrayUtils.to2DArrayFromString(sudokuSeedData[rand], 9);

            newState.solver && newState.solver.clear();
            newState.action = 'solve-random';
            newState.currentBoard = board;
            newState.previousBoard = board;
            newState.originalBoard = board;
            newState.solver = new Solver(
                new Board(sudokuSeedData[rand].split('')),
                state.depth,
                state.speed
            );
            newState.solver.iterateAndSolve();

            return newState;
        case actions.sudokuSetBoardError:
            newState.boardError = action.error;

            return newState;
        case actions.sudokuSetBoard:
            let currBoard = arrayUtils.to2DArrayFromString(action.board, 9);

            newState.currentBoard = currBoard;
            newState.originalBoard = currBoard;
            newState.solver && newState.solver.clear();
            newState.solver = new Solver(
                new Board(action.board.split('')),
                state.depth,
                state.speed
            );
            newState.solver.iterateAndSolve();

            return newState;
        case actions.sudokuSetAction:
            newState.action = action.action;
            newState.solver && newState.solver.clear();

            return newState;
        case actions.sudokuSetAllowedDepth:
            let newBoard = state.originalBoard;

            newState.depth = action.depth;
            newState.solver && newState.solver.clear();
            newState.currentBoard = newBoard;
            newState.previousBoard = newBoard;
            newState.solver = new Solver(
                new Board(newBoard[0].concat(
                    newBoard[1], newBoard[2], newBoard[3], newBoard[4],
                    newBoard[5], newBoard[6], newBoard[7], newBoard[8]
                )),
                action.depth,
                state.speed
            );
            newState.solver.iterateAndSolve();

            return newState;
        case actions.sudokuSetCurrentBoard:
            newState.previousBoard = state.currentBoard.slice();
            newState.currentBoard = arrayUtils.to2DArrayFromString(action.currentBoard, 9);
            newState.stepsRemaining = state.solver.queue.length;

        case actions.sudokuSetInput:
            newState.input = action.input;
            newState.boardError = null;

            return newState;
        case actions.sudokuSetSpeed:
            newState.speed = action.speed;
            newState.solver.setSpeed(action.speed);

            return newState;
        case actions.sudokuSolveInput:
            let curr = arrayUtils.to2DArrayFromString(state.input.join(''), 9);

            newState.action = 'solve';
            newState.currentBoard = curr;
            newState.originalBoard = curr;
            newState.solver && newState.solver.clear();
            newState.solver = new Solver(
                new Board(state.input),
                state.depth,
                state.speed
            );
            newState.solver.iterateAndSolve();

            return newState;
    }

    return state;
};
