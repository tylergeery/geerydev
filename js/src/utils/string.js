export default {
    /**
     * Truncate a string if over max char count
     *
     * @param {string} str
     * @param {int} charCount
     * @return {string}
     */
    truncate: function(str, charCount) {
        if (str.length > charCount) {
            return str.substr(0, charCount) + '...';
        }

        return str;
    }
}
