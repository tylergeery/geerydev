import { connect } from 'react-redux';

import ProjectList from '../components/ProjectList';

const mapStateToProps = (state, ownProps) => (
    {
        projects: state.projects
    }
);

const GeeryDevProjectList = connect(
  mapStateToProps
)(ProjectList);

export default GeeryDevProjectList;
