import { connect } from 'react-redux';

import CommentSection from '../components/CommentSection';

const mapStateToProps = (state, ownProps) => {
    return {
        blogId: state.blogId
    }
}

const GeeryDevCommentSection = connect(
    mapStateToProps
)(CommentSection)

export default GeeryDevCommentSection
