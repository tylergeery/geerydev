class BoardError {
    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return this.message || '';
    }
};

export default class Board {
    constructor(board) {
        this.board = board;
    }

    copy() {
        return new Board(this.board.slice());
    }

    getAsString() {
        return this.board.join('');
    }

    valid(arr) {
        for (let i = 1; i < 10; i++) {
            if (arr.indexOf(i) === -1) {
                return false;
            }
        }

        return true;
    }

    validateVector(vec) {
        for (let i = 0; i < 9; i++) {
            if (vec[i] && vec.indexOf(vec[i]) !== i) {
                return false;
            }
        }

        return true;
    }

    validate() {
        for (let i = 0; i < 9; i++) {
            // go through horizontals
            if (!this.validateVector(this.getRow(i * 9))) {
                throw new BoardError('Board contains invalid row ' + (i + 1));
            }

            // go through verticals
            if (!this.validateVector(this.getColumn(i))) {
                throw new BoardError('Board contains invalid column ' + (i + 1));
            }

            // go through each square
            if (!this.validateVector(this.getSquare(i * 9 + ((i % 3) * 3)))) {
                throw new BoardError('Board contains invalid square ' + (i + 1));
            }
        }
    }

    getAvailableValues(pos) {
        let available = [];
        let existing = [].concat(this.getColumn(pos), this.getRow(pos), this.getSquare(pos));

        for (let i = 1; i < 10; i++) {
            if (existing.indexOf(i) !== -1) {
                continue;
            }

            available.push(i);
        }

        return available;
    }

    getColumnStart(pos) {
        return pos % 9;
    }

    getColumn(pos) {
        let colStart = this.getColumnStart(pos);

        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map((x) => (this.getValue(x + colStart)));
    }

    getRowStart(pos) {
        return Math.floor(pos / 9) * 9;
    }

    getRow(pos) {
        let rowStart = this.getRowStart(pos);

        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (this.getValue(x + rowStart)));
    }

    getSquareStart(pos) {
        let row = Math.floor(pos / 9);
        let col = pos % 9;

        return 9 * (row - (row % 3)) + (col - (col % 3));
    }

    getSquare(pos) {
        let squareStart = this.getSquareStart(pos);

        return [0, 1, 2, 9, 10, 11, 18, 19, 20].map((x) => (this.getValue(x + squareStart)));
    }

    getValue(pos) {
        return +this.board[pos];
    }

    setValue(pos, value) {
        this.board[pos] = value;
    }

    pretty() {
        let output = '\n';
        let board = this.board.join('');

        for (let i = 0; i < 9; i++) {
            output += board.substr(i * 9, 9).split('').join('|') + '\n';

            if (i < 8 && i % 3 === 2) {
                output += '_________\n';
            }
        }

        return output;
    }

    solved() {
        for (let i = 0; i < 9; i++) {
            // go through horizontals
            if (!this.valid(this.getRow(i * 9))) {
                return false;
            }

            // go through verticals
            if (!this.valid(this.getColumn(i))) {
                return false;
            }

            // go through each square
            if (!this.valid(this.getSquare(i * 9 + ((i % 3) * 3)))) {
                return false;
            }
        }

        return true;
    }
}
