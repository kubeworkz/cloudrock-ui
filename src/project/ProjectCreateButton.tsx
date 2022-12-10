import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { translate } from '@cloudrock/i18n/translate';
import { RootState } from '@cloudrock/store/reducers';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { isOwnerOrStaff } from '@cloudrock/workspace/selectors';

import { gotoProjectCreate } from './actions';

const PureProjectCreateButton: FunctionComponent<any> = (props) => (
  <ActionButton
    title={translate('Add project')}
    action={props.gotoProjectCreate}
    tooltip={props.tooltip}
    icon="fa fa-plus"
    disabled={props.disabled}
  />
);

const mapStateToProps = (state: RootState) => {
  const ownerOrStaff = isOwnerOrStaff(state);

  if (!ownerOrStaff) {
    return {
      disabled: true,
      tooltip: translate(
        "You don't have enough privileges to perform this operation.",
      ),
    };
  } else {
    return {
      disabled: false,
    };
  }
};

const enhance = connect(mapStateToProps, { gotoProjectCreate });

export const ProjectCreateButton = enhance(PureProjectCreateButton);
