import { connect } from 'react-redux'

import PostList from '../components/PostList'

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts || []
  }
}

const GeeryDevPostList = connect(
  mapStateToProps
)(PostList)

export default GeeryDevPostList
