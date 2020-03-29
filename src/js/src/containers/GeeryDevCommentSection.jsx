import { connect } from 'react-redux';

import CommentSection from '../components/CommentSection';

const mapStateToProps = (state, ownProps) => (
    {
        blogId: state.comments.postId
    }
);

const GeeryDevCommentSection = connect(
    mapStateToProps
)(CommentSection);

export default GeeryDevCommentSection;
