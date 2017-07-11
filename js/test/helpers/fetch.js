import sinon from 'sinon';

export default {
    getStub(responseString) {
        sinon.stub(window, 'fetch');

        var res = new window.Response(responseString, {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        window.fetch.returns(Promise.resolve(res));
    },

    restore() {
        window.fetch.restore();
    }
};
