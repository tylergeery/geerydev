import Domain from './Domain';
import sudokuActions from '../../actions/sudoku';
import defer from '../../utils/defer';
import store from '../../store';

class Solution {
    constructor(board) {
        this.board = board;
        this.domain = new Domain(board);
    }

    copy() {
        return new Solution(this.board.copy());
    }

    getHeuristicValue() {
        return this.domain.getHeuristicValue();
    }

    isDeadEnd() {
        return this.domain.getHeuristicValue() === -1;
    }

    update(pos, value) {
        this.board.setValue(pos, value);
        this.domain.updateNeighbors(pos);

        return this;
    }
}

export default class Solver {
    constructor(board, allowedDepth = 85, speed = 250) {
        let solution = new Solution(board);
        this.best = solution;
        this.allowedDepth = allowedDepth;
        this.queue = [];
        this.speed = speed;
    }

    clear() {
        clearTimeout(this.timeout);
    }

    complete(solution) {
        this.queueSolution(solution);

        throw solution;

        return solution;
    }

    iterate() {
        this.timeout = setTimeout(() => {
            if (!this.queue.length) {
                return;
            }

            let solution = this.queue.shift();

            // update current state of game
            store.dispatch(
                sudokuActions.setCurrentBoard(solution.board.getAsString())
            );

            this.iterate();
        }, this.speed);
    }

    iterateAndSolve() {
        try {
            this.solve(this.best);
        } catch (e) {
            // SOLUTION FOUND!
        }

        this.iterate();
    }

    queueSolution(solution) {
        this.queue.push(solution);
    }

    setAllowedDepth(allowedDepth) {
        this.allowedDepth = allowedDepth;
    }

    setSpeed(speed) {
        this.speed = speed;;
    }

    setBest(solution) {
        if (solution.getHeuristicValue() > this.best.getHeuristicValue()) {
            this.best = solution;
        }
    }

    solve(solution, depth = 1) {
        if (solution.board.solved()) {
            return this.complete(solution);
        }

        if (this.best.board.solved()) {
            return this.complete(this.best);
        }

        let unassigned = solution.domain.getOpenPos();
        let recursive = depth < this.allowedDepth;
        let available = solution.board.getAvailableValues(unassigned).reverse();
        let promises = [];

        available.forEach((value, i) => {
            solution.update(unassigned, value);

            this.queueSolution(solution);

            if (recursive && !solution.isDeadEnd()) {
                let copy = this.solve(solution.copy(), depth + 1);

                if (copy.board.solved()) {
                    return this.complete(copy);
                }
            }

            this.setBest(solution);

            if (this.best.board.solved()) {
                return this.complete(this.best);
            }

            solution.update(solution, unassigned, 0);
        });

        return this.best;
    }

    update(solution, pos, value) {
        return solution.update(pos, value);
    }
}
