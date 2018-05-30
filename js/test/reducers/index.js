import { expect, assert } from 'chai';

import actions from '../../src/actions/constants';
import reducer from '../../src/reducers';

describe('reducers/index', () => {
    it('has expected initial state', () => {
        let initialState = reducer(null, {});

        assert(initialState.nav.quotes.length === 5);
        assert(initialState.nav.activeQuote === 0);
        assert(initialState.nav.showNav === false);
        assert(initialState.panels.panelFilters.length === 3);
    });

    describe('it handles expected action types', () => {
        let initialState = reducer(null, {});

        it(actions.setShowNav, () => {
            let state = reducer(initialState, {
                type: actions.navSetShowNav
            });
            assert(state.nav.showNav !== initialState.nav.showNav);
            state = reducer(state, {
                type: actions.navSetShowNav
            });
            assert(state.nav.showNav === initialState.nav.showNav);
        });

        it(actions.navIncrementQuote, () => {
            let state = reducer(initialState, {
                type: actions.navIncrementQuote
            });
            expect(state.nav.activeQuote).to.equal(initialState.nav.activeQuote + 1);

            state.nav.activeQuote = state.quotes.length - 1;
            state = reducer(state, { type: actions.navIncrementQuote });

            expect(state.activeQuote).to.equal(0);
        });

        it(actions.postsFetch, () => {
            let posts = [{ content: 'what?' }, { vary: 'mas' }];
            let state = reducer(initialState, {
                type: actions.postsFetch,
                posts: posts
            });

            expect(state.posts.list).to.equal(posts);
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
