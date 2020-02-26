import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CommentList from '../../src/components/CommentList';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } = TestUtils;

describe('components/CommentList', () => {
    const comments = [
        {
            _id: 1,
            responseHead: '53640',
            responseTo: '5363f',
            email: 'geerybot@yahoo.com',
            content: 'The Kings will definitely have the better road fans.  Are you kidding me??',
            blogId: '5363f',
            likes: 1,
            name: 'Not a Kings Fan'
        }, {
            _id: 2,
            responseHead: '537740',
            responseTo: '53773f',
            email: 'geerybot@yahoo.com',
            content: 'Still so funny',
            blogId: '53773f',
            likes: 12,
            name: 'Also, still Not a Kings Fan'
        }
    ];

    it('renders a list of comments', () => {
        const commentList = renderIntoDocument(
            <CommentList comments={comments} />
        );
        const commentEls = scryRenderedDOMComponentsWithClass(commentList, 'single-comment');

        expect(commentEls.length).to.equal(2);
        expect(commentEls[0].textContent).to.contain(comments[0].content);
        expect(commentEls[1].textContent).to.contain(comments[1].content);
    });

    it('responds to hover event', () => {
        // ensure setState for comment is called on hover
        const commentList = renderIntoDocument(
            <CommentList comments={comments} />
        );
        const commentEls = scryRenderedDOMComponentsWithClass(commentList, 'single-comment');

        // TODO: simulate onHover
    });
});
