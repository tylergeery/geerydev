import Domain from './Domain';

export default class Solver {
    constructor(board, allowedDepth = 10000) {
        this.board = this.board;
        this.allowedDepth = allowedDepth;
    }

    clear() {
        // TODO: stop solving
    }

    setAllowedDepth(allowedDepth) {
        this.allowedDepth = allowedDepth;
    }

    solve(board, depth) {
        if (board.solved()) {
            return board;
        }

        let domain = new Domain(board);
        let unassigned = domain.getOpenPos();

        board.getAvailableValues(unassigned).forEach(value => {
            board.setValue(unassigned, value);
            domain.updateNeighbors(unassigned);

            if depth < this.allowedDepth {
                copy = this.solve(board.copy(), depth + 1);

                if (copy.solved()) {
                    return copy;
                }

                if (copy.getHeuristicValue() > this.best.getHeuristicValue()) {
                    this.best = copy;
                }
            }

            board.setValue(unassigned, 0);
            domain.updateNeighbors(unassigned);
        });

        return this.best;
    }
}
