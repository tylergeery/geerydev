module.exports = {
    /**
     * Randomly shuffle an array
     *
     * @param {array} arr
     * @return {array} randomly shuffled
     */
    shuffleRandom: function (array) {
        var currentIndex = arr.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return array;
    },

    /**
     * Turn string into 2d array
     *
     * @param {string} str
     * @param {int} splitLength
     * @return {array}
     */
    to2DArrayFromString: function (str, splitLength) {
        let arr = [];
        let splits = Math.ceil(str.length / splitLength);

        for (let i = 0; i < splits; i++) {
            arr.push(str.substr(i * splitLength, splitLength).split(''));
        }

        return arr;
    }
};
