export default class Solver {
    constructor(board, depth = 10000) {
        this.board = this.board;
        this.domain = null; //TODO
        this.queue = this.initializeConstraints();
        this.depth = depth;
    }

    initializeConstraints() {
        constraints = [];

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                for (let k = j + 1; k < 9; k++) {
                    // initialize row constraints
                    constraints.push([i * 9 + j, i * 9 + k]);

                    // initialize col constraints
                    constraints.push([j * 9 + i, k * 9 + i]);
                }

                // initialize square constraints
                let pos1 = i * 9 + j;
                [7, 8, 10, 11, 16, 17, 19, 20].forEach(diff => {
                    let pos2 = i * 9 + j + diff;
                    if (this.inSameSquare(pos1, pos2)) {
                        constraints.push([pos1, pos2]);
                    }
                });

            }
        }

        return constraints;
    }

    inSameSquare(pos1, pos2) {
        sameColThird = (Math.floor((pos1 % 9) / 3) == Math.floor((pos2 % 9) / 3));
        sameRowThird = (Math.floor(pos1 / 27) == Math.floor(pos2 / 27));

        return sameRowThird && sameColThird;
    }

    revised(constraint) {
        if (self.board.getValue(constraint[0]) !== 0) {
            return false;
        }

        let revised = false;
        let availableValues = this.board.getAvailableValues(constraint[0]);

        self.domain.getDomainValues(constraint[0]).forEach(value => {
            neighborHasAvailableValues = true;
            neighborDomainValues = self.domain.getDomainValues(constraint[1]);

            if (!neighborDomainValues.length) {
                neighborHasAvailableValues = false;
            } else if (neighborDomainValues.length === 1 && neighborDomainValues[0] === value) {
                neighborHasAvailableValues = false;
            }

            if (!neighborHasAvailableValues || availableValues.indexOf(value) === -1) {
                this.domain.removeValue(constraint[0], value);
                revised = true;
            };
        });

        return revised;
    }

    setDepth(depth) {
        this.depth = depth;
    }

    solve() {
        if (this.board.solved()) {
            return this.board;
        }

        let unassigned = this.domain.getOpenPos();

        this.board.getAvailableValues(unassigned).forEach(value => {
            this.board.setValue(unassigned, value);

            if (depth < this.depth) {
                self.solve(depth + 1);
            }

            if (this.board.solved()) {
                return this.board;
            }

            this.board.setValue(unassigned, 0);
        });

        return this.board;
    }
}
