import { connect } from 'react-redux';

import HeadBar from '../components/HeadBar';

const mapStateToProps = (state, ownProps) => (
    {
        results: state.results
    }
);

const mapDispatchToProps = (dispatch, ownProps) => ({});

const GeeryDevHeadBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadBar);

export default GeeryDevHeadBar;
