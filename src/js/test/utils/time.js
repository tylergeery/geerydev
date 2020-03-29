import { expect } from 'chai';
import _ from 'lodash';
import time from '../../src/utils/time';

describe('utils/time', () => {
    describe('#iso8601ToPretty', () => {
        it('tests iso8601ToPretty with full year', () => {
            let testMap = {
                '2017-12-19T06:47:06.239Z': 'Dec 2017',
                '2017-07-22T03:11:22.713Z': 'Jul 2017'
            };

            for (let tz in testMap) {
                expect(testMap[tz]).to.equal(time.iso8601ToPretty(tz, true));
            }
        });
    });

    describe('#iso8601ToFullReadable', () => {
        it('prints full date', () => {
            let testMap = {
                '2017-12-19T06:47:06.239Z': 'December 18, 2017',
                '2017-07-22T03:11:22.713Z': 'July 21, 2017'
            };

            for (let tz in testMap) {
                expect(testMap[tz]).to.equal(time.iso8601ToFullReadable(tz));
            }
        });
    });
});
