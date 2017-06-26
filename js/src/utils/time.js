var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export default {
    /**
     * Convert ISO 8601 date standard to pretty format
     *
     * @param {string} iso8601
     * @return {string} date in pretty format
     */
    iso8601ToPretty(iso8601) {
        let date = new Date(Date.parse(iso8601));

        return [
            months[date.getMonth() - 1],
            date.getFullYear().toString().substr(-2)
        ].join(' ');
    },

    /**
     * Convert ISO 8601 date standard to day
     *
     * @param {string} iso8601
     * @return {string} day of date
     */
    iso8601ToDay(iso8601) {
        let date = new Date(Date.parse(iso8601));

        return date.getDay().toString();
    }
}
