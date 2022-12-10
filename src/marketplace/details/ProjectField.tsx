import { FC } from 'react';
import { connect } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ProjectCreateButton } from '@cloudrock/project/ProjectCreateButton';
import { RootState } from '@cloudrock/store/reducers';
import { getWorkspace, getCustomer } from '@cloudrock/workspace/selectors';
import {
  ORGANIZATION_WORKSPACE,
  USER_WORKSPACE,
} from '@cloudrock/workspace/types';

import { FormGroup } from '../offerings/FormGroup';

import { CustomerCreateGroup } from './CustomerCreateGroup';
import { ProjectCreateGroup } from './ProjectCreateGroup';
import { ProjectSelectField } from './ProjectSelectField';

const mapStateToProps = (state: RootState) => {
  const workspace = getWorkspace(state);
  const customer = getCustomer(state);
  if (workspace === ORGANIZATION_WORKSPACE) {
    return {
      projects: customer.projects,
    };
  } else {
    return { workspace };
  }
};

const connector = connect(mapStateToProps);

type StateProps = ReturnType<typeof mapStateToProps>;

type OwnProps = { previewMode?: boolean };

type ProjectFieldProps = StateProps & OwnProps;

const PureProjectField: FC<ProjectFieldProps> = (props) =>
  props.projects ? (
    <FormGroup
      labelClassName="control-label col-sm-3"
      valueClassName="col-sm-9"
      label={translate('Project')}
      required={true}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {props.projects.length > 0 && (
          <div style={{ flexGrow: 1, marginRight: 10 }}>
            <ProjectSelectField projects={props.projects} />
          </div>
        )}
        {!props.previewMode && <ProjectCreateButton />}
      </div>
      <div className="help-block m-b-none text-muted">
        {translate('The project will be changed for all items in cart.')}
      </div>
    </FormGroup>
  ) : props.workspace === USER_WORKSPACE ? (
    <>
      <CustomerCreateGroup />
      <ProjectCreateGroup />
    </>
  ) : null;

export const ProjectField = connector(PureProjectField);
