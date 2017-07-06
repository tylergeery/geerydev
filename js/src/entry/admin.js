import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from '../store'
import postActions from '../actions/post'
import commentActions from '../actions/comment'
import AdminRouter from '../components/admin/navbar'

ReactDOM.render(
    <Provider store={store}>
        <AdminRouter />
    </Provider>,
    document.getElementById('geerydev-container')
);

store.dispatch(postActions.getPostList())
    .then(function(response) {
        if (!response.posts || !response.posts.length) {
            return
        }

        store.dispatch(postActions.setBlogId(response.posts[0]._id))
        store.dispatch(commentActions.getComments(response.posts[0]._id))
    })
