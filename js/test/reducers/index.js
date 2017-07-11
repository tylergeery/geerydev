import { expect, assert } from 'chai';
import reducer from '../../src/reducers';

describe('reducers/index', () => {
    it('has expected initial state', () => {
        let initialState = reducer(null, {});

        assert(initialState.quotes.length === 5);
        assert(initialState.activeQuote === 0);
        assert(initialState.showNav === false);
        assert(initialState.panelFilters.length === 3);
    });

    describe('it handles expected action types', () => {
        let initialState = reducer(null, {});

        it('SET_SHOW_NAV', () => {
            let state = reducer(initialState, {
                type: 'SET_SHOW_NAV'
            });
            assert(state.showNav !== initialState.showNav);
            state = reducer(state, {
                type: 'SET_SHOW_NAV'
            });
            assert(state.showNav === initialState.showNav);
        });

        it('INCREMENT_QUOTE', () => {
            let state = reducer(initialState, {
                type: 'INCREMENT_QUOTE'
            });
            expect(state.activeQuote).to.equal(initialState.activeQuote + 1);

            state.activeQuote = state.quotes.length - 1;
            state = reducer(state, { type: 'INCREMENT_QUOTE' });

            expect(state.activeQuote).to.equal(0);
        });

        it('FETCH_POST_LIST', () => {
            let posts = [{ content: 'what?' }, { vary: 'mas' }];
            let state = reducer(initialState, {
                type: 'FETCH_POST_LIST',
                posts: posts
            });

            expect(state.posts).to.equal(posts);
        });
    });

    it('ignores fake actions', () => {
        let initialState = reducer(null, {});
        let newState = reducer(initialState, {
            type: 'FAKE_ACTION',
            prop: true,
            comments: [1, 2, 3]
        });

        expect(initialState).to.equal(newState);
    });
});
