export default {
    /**
     * Get a url for a given object
     *
     */
    queryStringFromObject: function (obj) {
        var key,
            parts = [];

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                parts.push(key + '=' + obj[key]);
            }
        }

        return parts.length ? ('?' + parts.join('&')) : '';
    },

    /**
     * Get an object of url params
     *
     * @return {Object}
     */
    getParams: function() {
        var i, l, parts, result = {},
            params = this.getSearch().substr(1).split('&');

        for (i = 0, l = params.length; i < l; i++) {
            parts = params[i].split('=');
            result[parts[0]] = parts[1] || '';
        }

        return result;
    },

    /**
     * Get the current url query string
     *
     * @return {string}
     */
    getSearch: function () {
        return window.location.search || '?'
    }
}
