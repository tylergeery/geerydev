export default class Domain {
    constructor(board) {
        this.domains = [];
        this.board = board;

        for (let i = 0; i < 81; i++) {
            this.domains.push([]);
            this.updateDomainValues(i);
        }
    }

    getDomainValues(pos) {
        return this.domains[pos];
    }

    removeValue(pos, value) {
        let indy = this.domains[pos].indexOf(value);

        if (index > -1) {
            this.domains[pos].splice(indy, 1);
        }
    }

    getOpenPos() {
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < 81; j++) {
                if (this.board.getValue(j) !== 0) {
                    continue;
                }

                if (this.domains[j].length === i) {
                    return j;
                }
            }
        }

        return -1;
    }

    updateDomainValues(pos) {
        if (this.board.getValue(pos) === 0) {
            this.domains[pos] = this.board.getAvailableValues(pos);
        } else {
            this.domains[pos] = [this.board.getValue(pos)];
        }
    }

    updateNeighbors(pos) {
        let i = 0;
        let rowStart = this.board.getRowStart(pos);
        let colStart = this.board.getColumnStart(pos);
        let squareStart = this.board.getSquareStart(pos);

        for (i = 0; i < 9; i++) {
            let neighborInRow = rowStart + i;
            let neighborInCol = colStart + (9 * i);

            this.updateDomainValues(neighborInRow);
            this.updateDomainValues(neighborInCol);
        }

        [0, 1, 2, 9, 10, 11, 18, 19, 20].forEach(offset => {
            let neighborInSquare = squareStart + offset;

            this.updateDomainValues(neighborInSquare);
        });
    }
}
