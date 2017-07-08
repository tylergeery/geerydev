import { connect } from 'react-redux';

import CommentList from '../components/CommentList';

const mapStateToProps = (state, ownProps) => {
    return {
        blogId: state.blogId,
        comments: state.comments
    }
}

const GeeryDevCommentList = connect(
    mapStateToProps
)(CommentList)

export default GeeryDevCommentList
