var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

module.exports = {
    /**
     * Convert ISO 8601 date standard to pretty format
     *
     * @param {string} iso8601
     * @param {boolean} fullYear
     * @return {string} date in pretty format
     */
    iso8601ToPretty: function (iso8601, fullYear) {
        let date = new Date(Date.parse(iso8601));

        return [
            months[date.getMonth()].substring(0, 3),
            fullYear ? date.getFullYear() : date.getFullYear().toString().substr(-2)
        ].join(' ');
    },

    /**
     * Convert ISO 8601 date standard to day
     *
     * @param {string} iso8601
     * @param {boolean} fullDay
     * @return {string} day of date
     */
    iso8601ToDay: function (iso8601, fullDay) {
        let day = (new Date(Date.parse(iso8601))).getDate();

        return fullDay ? day + this.getDayEnding(day) : day;
    },

    /**
     * Convert ISO 8601 date standard to day
     *
     * @param {string} iso8601
     * @return {string} day of date
     */
    iso8601ToFullReadable: function (iso8601) {
        let date = new Date(Date.parse(iso8601));

        return [
            months[date.getMonth()],
            date.getDate() + ',',
            date.getFullYear()
        ].join(' ');
    },

    getDayEnding: function (day) {
        let ending = '';

        if (day > 0 && day <= 31)  {
            switch (day) {
                case 1:
                case 21:
                case 31:
                    ending = 'st';
                    break;
                case 2:
                case 22:
                    ending = 'nd';
                    break;
                case 3:
                case 23:
                    ending = 'rd';
                    break;
                default:
                    ending = 'th';
            }
        }

        return ending;
    }
};
