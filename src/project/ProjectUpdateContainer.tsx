import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation } from '@cloudrock/i18n';
import { getConfig } from '@cloudrock/store/config';
import {
  getCustomer,
  isOwner,
  isOwnerOrStaff,
  isStaff,
} from '@cloudrock/workspace/selectors';

import * as actions from './actions';
import { ProjectDetails } from './ProjectDetails';
import { ProjectUpdateForm } from './ProjectUpdateForm';

const ProjectUpdateComponent = (props) =>
  props.canManage ? (
    <ProjectUpdateForm {...props} />
  ) : (
    <ProjectDetails
      name={props.project.name}
      description={props.project.description}
      end_date={props.project.end_date}
      translate={props.translate}
    />
  );

const mapStateToProps = (state, ownProps) => ({
  customer: getCustomer(state),
  project_uuid: ownProps.project.uuid,
  initialValues: {
    name: ownProps.project.name,
    description: ownProps.project.description,
    end_date: ownProps.project.end_date,
    backend_id: ownProps.project.backend_id,
    oecd_fos_2007_code: ownProps.oecdCodes.find(
      (option) => option.value === ownProps.project.oecd_fos_2007_code,
    ),
    is_industry: ownProps.project.is_industry,
  },
  project_type: ownProps.project.type_name,
  canManage: isOwnerOrStaff(state),
  isStaff: isStaff(state),
  isOwner: isOwner(state),
  enforceLatinName: getConfig(state).enforceLatinName,
  isDisabled: !isStaff(state) && !isOwner(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateProject: (data) =>
    actions.updateProject(
      {
        ...data,
        uuid: ownProps.project.uuid,
        cache: ownProps.project,
      },
      dispatch,
    ),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation,
);

export const ProjectUpdateContainer = enhance(ProjectUpdateComponent);
