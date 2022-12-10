import { Field, reduxForm } from 'redux-form';

import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';
import { GROUP_INVITATIONS_FILTER_FORM_ID } from '@cloudrock/invitations/constants';

const PureGroupInvitationsFilter = () => (
  <Field
    name="is_active"
    component={AwesomeCheckboxField}
    label={translate('Show only active group invitations')}
    parse={(v) => v || undefined}
  />
);

const enhance = reduxForm({
  form: GROUP_INVITATIONS_FILTER_FORM_ID,
});

export const GroupInvitationsFilter = enhance(PureGroupInvitationsFilter);
