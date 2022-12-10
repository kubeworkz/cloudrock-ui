import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { Plan, Offering, AttributesType } from '@cloudrock/marketplace/types';
import { RootState } from '@cloudrock/store/reducers';
import { getProject } from '@cloudrock/workspace/selectors';
import { Project } from '@cloudrock/workspace/types';

import { FORM_ID } from '../details/constants';
import {
  PureOfferingConfigurator,
  PureOfferingConfiguratorProps,
} from '../details/OfferingConfigurator';
import { OfferingFormData } from '../details/types';

const storeConnector = connect<
  { project: Project },
  {},
  {
    offering: Offering;
    plan: Plan;
    limits: string[];
    initialLimits: AttributesType;
    initialAttributes: AttributesType;
  },
  RootState
>((state: RootState) => ({
  project: getProject(state),
}));

export const validate = (_, props) => {
  const errors: any = {};
  if (!props.project) {
    errors.project = translate('This field is required.');
  }
  return errors;
};

const formConnector = reduxForm<
  OfferingFormData,
  PureOfferingConfiguratorProps
>({ form: FORM_ID, validate });

const enhance = compose(storeConnector, formConnector);

export const ShoppingCartItemUpdateForm = enhance(PureOfferingConfigurator);
