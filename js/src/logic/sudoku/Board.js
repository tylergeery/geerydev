export default class Board {
    constructor(board) {
        this.board = board;
    }

    copy() {
        return new Board(this.board);
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

        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map((x) => (+this.board[x + colStart]));
    }

    getRowStart(pos) {
        return Math.floor(pos / 9) * 9;
    }

    getRow(pos) {
        let rowStart = this.getRowStart(pos);

        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (+this.board[x + rowStart]));
    }

    getSquareStart(pos) {
        let row = Math.floor(pos / 9);
        let col = pos % 9;

        return 9 * (row - (row % 3)) + (col - (col % 3));
    }

    getSquare(pos) {
        let squareStart = this.getSquareStart(pos);

        return [0, 1, 2, 9, 10, 11, 18, 19, 20].map((x) => (+this.board[x + squareStart]));
    }

    getValue(pos) {
        return +this.board[pos];
    }

    setValue(pos, value) {
        this.board[pos] = value;
    }

    pretty() {
        console.log(this.board);
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
            if (!this.valid(this.getSquare(i * 9 + (i % 3) * 3))) {
                return false;
            }
        }

        return true;
    }

    /**
     * Simply counts amount of non-empty spaces
     *
     * @return {int}
     */
    getHeuristicValue() {
        let value = this.board.length;

        for (let i = 0; i < this.board.length; i++) {
            if (+this.board[i] === 0) {
                value--;
            }
        }

        return value;
    }
}
