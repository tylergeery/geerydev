import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SidePanel from '../../src/components/SidePanel';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithClass } = TestUtils;

describe('components/SidePanel', () => {
    it('does not render a list without posts', () => {
        const posts = [];
        const sidePanel = renderIntoDocument(
            <SidePanel sidePanelPosts={posts} />
        );

        const postEls = scryRenderedDOMComponentsWithClass(
            sidePanel,
            'point'
        );
    });

    it('renders a list of posts', () => {
        const posts = [
            {
                _id: 1,
                question: 'What is the meaning of life?',
                created: '2014-05-02T20:49:20.085Z'
            }, {
                _id: 2,
                question: 'What is the meaning of geerydev? SERIOUSLYLYLLYLYLYLYLYLYLYLYLYLYLLYLYLYL',
                created: '2014-05-02T20:49:20.085Z'
            }
        ];
        const sidePanel = renderIntoDocument(
            <SidePanel sidePanelPosts={posts} />
        );
        const postEls = scryRenderedDOMComponentsWithClass(
            sidePanel,
            'point'
        );

        expect(postEls.length).to.equal(2);
        expect(postEls[0].textContent).to.contain(posts[0].question);
        expect(postEls[1].textContent).to.not.contain(posts[1].question);
        expect(postEls[1].textContent).to.contain(posts[1].question.substr(0, 40));
    });
});
