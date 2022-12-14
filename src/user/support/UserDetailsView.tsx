import { FunctionComponent } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { UserEvents } from '@cloudrock/user/dashboard/UserEvents';
import { KeysList } from '@cloudrock/user/keys/KeysList';
import {
  isVisibleForSupportOrStaff,
  userManageIsVisible,
} from '@cloudrock/user/support/selectors';
import { UserDetailsTable } from '@cloudrock/user/support/UserDetailsTable';
import { UserEditContainer } from '@cloudrock/user/support/UserEditContainer';
import { UserOfferingList } from '@cloudrock/user/UserOfferingList';
import { UserDetails } from '@cloudrock/workspace/types';

interface StateProps {
  isVisibleForSupportOrStaff: boolean;
  userManageIsVisible: boolean;
}

interface OwnProps {
  user: UserDetails;
}

export type UserDetailsViewProps = TranslateProps & StateProps & OwnProps;

export const PureUserDetailsView: FunctionComponent<UserDetailsViewProps> = (
  props,
) => (
  <Tabs defaultActiveKey={1} id="user-details" unmountOnExit={true}>
    {props.isVisibleForSupportOrStaff && (
      <Tab eventKey={1} title={props.translate('Details')}>
        <div className="m-t-sm">
          <UserDetailsTable user={props.user} />
        </div>
      </Tab>
    )}
    <Tab eventKey={2} title={props.translate('Audit log')}>
      <div className="m-t-sm">
        <UserEvents user={props.user} showActions={false} />
      </div>
    </Tab>
    {props.userManageIsVisible && (
      <Tab eventKey={3} title={props.translate('Manage')}>
        <div className="m-t-sm">
          <UserEditContainer user={props.user} showDeleteButton={false} />
        </div>
      </Tab>
    )}
    <Tab eventKey={4} title={props.translate('Keys')}>
      <div className="m-t-sm">
        <KeysList user={props.user} />
      </div>
    </Tab>
    <Tab eventKey={5} title={props.translate('Remote accounts')}>
      <div className="m-t-sm">
        <UserOfferingList user={props.user} />
      </div>
    </Tab>
  </Tabs>
);

const mapStateToProps = (state: RootState) => ({
  userManageIsVisible: userManageIsVisible(state),
  isVisibleForSupportOrStaff: isVisibleForSupportOrStaff(state),
});

const enhance = compose(
  connect<StateProps, {}, OwnProps>(mapStateToProps),
  withTranslation,
);

export const UserDetailsView = enhance(PureUserDetailsView);
