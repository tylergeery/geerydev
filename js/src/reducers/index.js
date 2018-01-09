import actions from '../actions/constants';
import sudokuSeedData from '../data/sudoku/seed';

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
    showNav: false,
    searchResults: [],
    activePanel: '',
    panelFilters: [
        {
            active: false,
            name: 'Comments',
            value: 'comments'
        },
        {
            active: true,
            name: 'Recent',
            value: 'created'
        },
        {
            active: false,
            name: 'Mystery',
            value: 'mystery'
        }
    ],
    projects: [],
    sidePanelPosts: [],
    blogId: null,
    comments: [],
    sudoku: {
        action: 'Start',
        board: Array.from(Array(9), () => Array.from(Array(9), () => null))
    }
};

export default function(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'SET_SHOW_NAV':
            newState.showNav = !state.showNav;

            return newState;
        case 'INCREMENT_QUOTE':
            newState.activeQuote = (state.activeQuote + 1) % state.quotes.length;

            return newState;
        case 'FETCH_POSTS':
            newState.searchResults = action.searchResults;

            return newState;
        case 'SET_ACTIVE_PANEL':
            newState.activePanel = action.panel;

            return newState;
        case 'FETCH_POST_LIST':
            newState.posts = action.posts;

            return newState;
        case 'FETCH_PROJECT_LIST':
            newState.projects = action.projects;

            return newState;
        case 'FETCH_SIDE_PANEL_POSTS':
            newState.sidePanelPosts = action.posts;

            return newState;
        case 'SET_BLOG_ID':
            newState.blogId = action.blogId;

            return newState;
        case 'FETCH_COMMENTS_COMPLETE':
            newState.comments = action.comments;

            return newState;

        case 'FETCH_SUBSCRIBERS_COMPLETE':
            newState.subscribers = action.subscribers;

            return newState;
        case 'FETCH_USERS_COMPLETE':
            newState.users = action.users;

            return newState;
        case actions.sudokuSetRandomBoard:
            var currentBoard = state.sudoku.board.reduce((row, acc) => row + acc, ''),
                rand = Math.floor(Math.random() * sudokuSeedData.length);

            while (sudokuSeedData[rand] === currentBoard) {
                rand = Math.floor(Math.random() * sudokuSeedData.length);
            }

            newState.sudoku.board = [
                sudokuSeedData[rand].substr(0, 9).split(''),
                sudokuSeedData[rand].substr(9, 9).split(''),
                sudokuSeedData[rand].substr(18, 9).split(''),
                sudokuSeedData[rand].substr(27, 9).split(''),
                sudokuSeedData[rand].substr(36, 9).split(''),
                sudokuSeedData[rand].substr(45, 9).split(''),
                sudokuSeedData[rand].substr(54, 9).split(''),
                sudokuSeedData[rand].substr(63, 9).split(''),
                sudokuSeedData[rand].substr(72, 9).split('')
            ];

            return newState;
        case actions.sudokuSetBoard:
            newState.sudoku.board = action.board;

            return newState;
    }

    return state;
}
