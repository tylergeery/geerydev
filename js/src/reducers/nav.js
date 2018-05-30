import actions from '../actions/constants';

let initialState = {
    quotes: [
        {
            content: 'The reality is that writing is a lonely, private and ' +
                'poor-paying affair.  For every writer kissed by fortune, there ' +
                'are thousands more whose longing is never requited',
            author: 'Alex Haley'
        }, {
            content: 'Only put off until tomorrow what you are willing to die having left undone',
            author: 'Pablo Picasso'
        }, {
            content: 'There are only two ways to live your life. One is as ' +
                'though nothing is a miracle. The other is as though everything ' +
                'is a miracle',
            author: 'Albert Einstein'
        }, {
            content: 'So go ahead, fall down.  The world looks different from the ground',
            author: 'Oprah'
        }, {
            content: 'It requires us to admit that we really do not know what ' +
                'the truth is in these cases. When compared to the intolerant ' +
                'views with which we began, this is a refreshing outcome',
            author: 'Steve Feldman'
        }
    ],
    activeQuote: 0,
    showNav: false
};
export default function nav(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.navSetShowNav:
            newState.showNav = !state.showNav;

            return newState;
        case actions.navIncrementQuote:
            newState.activeQuote = (state.activeQuote + 1) % state.quotes.length;

            return newState;
    }

    return state;
};
