import { connect } from 'react-redux'

import PostList from '../components/PostList'
import url from '../utils/url'

const mapStateToProps = (state, ownProps) => {
    const posts = state.posts || [];
    const params = url.getParams();
    const per_page = +params.per_page || 10;
    const page = +params.page || 1;

    return {
        posts: posts,
        forward: posts.length === per_page,
        backward: page > 1,
        page: page,
        per_page: per_page
    }
}

const GeeryDevPostList = connect(
  mapStateToProps
)(PostList)

export default GeeryDevPostList
