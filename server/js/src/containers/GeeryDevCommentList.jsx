import { connect } from 'react-redux';

import CommentList from '../components/CommentList';

const mapStateToProps = (state, ownProps) => (
    {
        blogId: state.comments.postId,
        comments: state.comments.list
    }
);

const GeeryDevCommentList = connect(
    mapStateToProps
)(CommentList);

export default GeeryDevCommentList;
