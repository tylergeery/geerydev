import { expect } from 'chai';
import _ from 'lodash';
import formData from '../../src/utils/formData';

describe('utils/formData', () => {
    it('gets form data with values when given an object', () => {
        const obj = {
            hello: 'world',
            random: true,
            values: [1, 2, 3],
            inty: 5
        };
        const formDataResponse = formData.getFromObject(obj);

        _.forOwn(obj, function (value, prop) {
            expect(value.toString()).to.equal(formDataResponse.get(prop));
        });
    });

});
