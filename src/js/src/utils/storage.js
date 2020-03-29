export default {
    /**
     * Get local storage key value
     *
     * @param {string} keyName
     */
    getKey: function (keyName) {
        try {
            if (window && window.localStorage) {
                return window.localStorage.getItem(keyName);
            }
        } catch (e) {
            // Do nothing, private browsing
        }

        return null;
    },

    /**
     * Set local storage key with value
     *
     * @pram {string} keyName
     * @param {string} value
     */
    setKey: function (keyName, value) {
        try {
            if (window && window.localStorage) {
                window.localStorage.setItem(keyName, value);
            }
        } catch (e) {
            // Do nothing, private browsing
        }
    },
};
