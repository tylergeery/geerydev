import Domain from './Domain';
import sudokuActions from '../../actions/sudoku';
import defer from '../../utils/defer';
import store from '../../store';

export default class Solver {
    constructor(board, allowedDepth = 5) {
        this.best = board;
        this.allowedDepth = allowedDepth;
    }

    clear() {
        // TODO: stop solving
        debugger;
    }

    setAllowedDepth(allowedDepth) {
        this.allowedDepth = allowedDepth;
    }

    solve(board = null, depth = 1) {
        return new Promise(resolve => {
            board = board || this.best;

            if (board.solved()) {
                return board;
            }

            let domain = new Domain(board);
            let unassigned = domain.getOpenPos();

            return defer.wait(1000)
                .then(() => {
                    board.getAvailableValues(unassigned).forEach((value, i) => {
                        board.setValue(unassigned, value);
                        domain.updateNeighbors(unassigned);

                        // update current state of game
                        store.dispatch(
                            sudokuActions.setCurrentBoard(board.getAsString())
                        );

                        if (depth < this.allowedDepth) {
                            this.solve(board.copy(), depth + 1).then(copy => {
                                if (copy.solved()) {
                                    resolve(copy);
                                }

                                if (copy.getHeuristicValue() > this.best.getHeuristicValue()) {
                                    this.best = copy;
                                }
                            });
                        }

                        board.setValue(unassigned, 0);
                        domain.updateNeighbors(unassigned);
                    });

                    resolve(this.best);
                });
        });
    }
}
