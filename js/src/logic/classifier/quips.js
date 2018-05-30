const quips = {
    low: [
        'If I had to guess. I would say ${subject}',
        'This isn\'t a lot to go on. How about ${subject}?',
        'Seems to me maybe ${subject}',
        '${subject} if I had to choose',
        'Ok. I don\'t know. Maybe ${subject}'
    ],
    med: [
        'I\'m saying it\'s ${subject}',
        'That\'s got to be from ${subject}',
        'Easy Peasy. ${subject}',
        'Made me think a bit. But it\'s from ${subject}',
        'Let\'s bet on it. It\'s ${subject}'
    ],
    high: [
        'That\'s from ${subject}. I\'ll Geerantee it',
        '${subject} I\'ve never been more certain',
        'Try something more difficult. It\'s from ${subject}',
        'No doubt in my mind. ${subject}'
    ]
};

/**
 * Get a quip to say something about the confidence of a prediction
 *
 * @param {String} pred
 * @param {Number} conf
 * return {String}
 */
export default function (pred, conf) {
    let rank = 'low';
    let subject = pred === 'GD' ? 'GeeryDev' : 'ThrowingItBackWeekly';

    if (conf > 5) {
        rank = 'high';
    } else if (conf > 2.5) {
        rank = 'med';
    }

    let quip = quips[rank][Math.floor(Math.random() * quips[rank].length)];

    return quip.replace('${subject}', subject);
}
