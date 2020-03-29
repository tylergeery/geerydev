import { connect } from 'react-redux';

import PostList from '../components/PostList';
import url from '../utils/url';

const mapStateToProps = (state, ownProps) => {
    const posts = state.posts.list || [];
    const params = url.getParams();
    const perPage = +params.per_page || 10;
    const page = +params.page || 1;

    return {
        posts: posts,
        forward: posts.length === perPage,
        backward: page > 1,
        page: page,
        per_page: perPage
    };
};

const GeeryDevPostList = connect(
  mapStateToProps
)(PostList);

export default GeeryDevPostList;
