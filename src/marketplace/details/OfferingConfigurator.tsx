import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, InjectedFormProps } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import {
  getFormComponent,
  getFormValidator,
} from '@cloudrock/marketplace/common/registry';
import { Offering, Plan } from '@cloudrock/marketplace/types';
import { RootState } from '@cloudrock/store/reducers';
import { getProject, getWorkspace } from '@cloudrock/workspace/selectors';
import { Project, USER_WORKSPACE } from '@cloudrock/workspace/types';

import { getDefaultLimits } from '../offerings/utils';

import { FORM_ID } from './constants';
import { OfferingFormData } from './types';

export interface PureOfferingConfiguratorProps {
  offering: Offering;
  project?: Project;
  plan?: Plan;
  limits: string[];
}

export const PureOfferingConfigurator = (
  props: PureOfferingConfiguratorProps & InjectedFormProps,
) => {
  const FormComponent = getFormComponent(props.offering.type);
  if (!FormComponent) {
    return null;
  }
  return <FormComponent {...props} />;
};

interface OwnProps {
  offering: Offering;
  limits: string[];
}

const mapStateToProps = (state: RootState, ownProps) => ({
  project: getProject(state),
  workspace: getWorkspace(state),
  initialValues: {
    limits: { ...getDefaultLimits(ownProps.offering), ...ownProps.limits },
    plan:
      ownProps.offering.plans.length === 1
        ? ownProps.offering.plans[0]
        : undefined,
  },
});

type StateProps = ReturnType<typeof mapStateToProps>;

const storeConnector = connect<StateProps, {}, OwnProps, RootState>(
  mapStateToProps,
);

export const validate = (_, props) => {
  const errors: any = {};
  if (props.workspace != USER_WORKSPACE && !props.project) {
    errors.project = translate('This field is required.');
  }
  if (props.values.plan && !props.values.plan.is_active) {
    errors.plan = translate('Plan capacity is full.');
  }
  const formValidator = getFormValidator(props.offering.type);
  if (formValidator) {
    Object.assign(errors, formValidator(props));
  }
  return errors;
};

const formConnector = reduxForm<
  OfferingFormData,
  PureOfferingConfiguratorProps
>({ form: FORM_ID, validate, touchOnChange: true });

const enhance = compose(storeConnector, formConnector);

export const OfferingConfigurator = enhance(PureOfferingConfigurator);
