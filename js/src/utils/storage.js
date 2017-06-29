export default {
    getKey: function(keyName) {
        try {
            if (window.localStorage) {
                return window.localStorage.getItem(keyName)
            }
        } catch (e) {
            // Do nothing, private browsing
        }

        return null;
    },

    setKey: function(keyName, value) {
        try {
            if (window.localStorage) {
                window.localStorage.setItem(keyName, value)
            }
        } catch (e) {
            // Do nothing, private browsing
        }
    },
}
