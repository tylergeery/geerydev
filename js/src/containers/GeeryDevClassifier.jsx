import { connect } from 'react-redux';

import Form from '../components/classifier/Form';
import classifierActions from '../actions/classifier';

const mapStateToProps = (state, ownProps) => (
    state.classifier
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        classify(value) {
            dispatch(classifierActions.classify(value));
        }
    }
);

const GeeryDevClassifier = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default GeeryDevClassifier;
