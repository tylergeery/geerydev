import { expect, assert } from 'chai';
import cloudActions from '../../src/actions/cloud';
import fetchMock from '../helpers/fetch';

describe('actions/cloud', () => {
    it('queryPosts', () => {
        let response = fetchMock.getStub('[{}, {}]');
        let queryPostAction = cloudActions.queryPosts('hello');

        assert(typeof queryPostAction === 'function');

        queryPostAction(() => {});
        assert(window.fetch.called);

        fetchMock.restore();
    });

    it('queryPosts - does not fetch for empty search', () => {
        let response = fetchMock.getStub('[{}, {}]');
        let queryPostAction = cloudActions.queryPosts('');

        assert(typeof queryPostAction !== 'function');
        assert(typeof queryPostAction === 'object');
        assert(window.fetch.called === false);

        fetchMock.restore();
    });
});
