import { FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAsyncFn, useEffectOnce } from 'react-use';
import { createSelector } from 'reselect';

import { ENV } from '@cloudrock/configs/default';
import { getById } from '@cloudrock/core/api';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { getProfile } from '@cloudrock/freeipa/api';
import { translate } from '@cloudrock/i18n';
import { countChecklists } from '@cloudrock/marketplace-checklist/api';
import { UserChecklist } from '@cloudrock/marketplace-checklist/UserChecklist';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { KeysList } from '@cloudrock/user/keys/KeysList';
import { isSupport, isStaff, isOwner } from '@cloudrock/workspace/selectors';

import { UserDetailsTable } from './support/UserDetailsTable';

const getUser = (userId) => getById('/users/', userId);

const getCanSeeChecklist = createSelector(
  isSupport,
  isStaff,
  isOwner,
  (support, staff, owner) => support || staff || owner,
);

export const UserPopover: FunctionComponent<{ resolve }> = ({ resolve }) => {
  const [{ loading, error, value }, callback] = useAsyncFn(async () => {
    let user;
    if (resolve.user_uuid) {
      user = await getUser(resolve.user_uuid);
    } else {
      user = resolve.user;
    }
    const checklistCount = await countChecklists();
    let profile = null;
    if (ENV.plugins.CLOUDROCK_FREEIPA?.ENABLED) {
      profile = await getProfile(user.uuid);
    }
    return { user, checklistCount, profile };
  }, [resolve]);

  useEffectOnce(() => {
    callback();
  });

  const canSeeChecklist = useSelector(getCanSeeChecklist);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <>
      <p>{translate('Unable to load user.')}</p>
      <button type="button" className="btn btn-default" onClick={callback}>
        <i className="fa fa-refresh"></i> {translate('Try again')}
      </button>
    </>
  ) : value?.user ? (
    <>
      <ModalHeader>
        <ModalTitle>
          {translate('User details for {fullName}', {
            fullName: value.user.full_name,
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Tabs defaultActiveKey={1} id="user-details" unmountOnExit={true}>
          <Tab eventKey={1} title={translate('Details')}>
            <div className="m-t-sm">
              <UserDetailsTable user={value.user} profile={value.profile} />
            </div>
          </Tab>

          {canSeeChecklist && value.checklistCount ? (
            <Tab eventKey={2} title={translate('Checklists')}>
              <div className="m-t-sm">
                <UserChecklist userId={value.user.uuid} readOnly={true} />
              </div>
            </Tab>
          ) : null}

          <Tab eventKey={3} title={translate('Keys')}>
            <div className="m-t-sm">
              <KeysList user={value.user} />
            </div>
          </Tab>
        </Tabs>
      </ModalBody>
      <ModalFooter>
        <CloseDialogButton />
      </ModalFooter>
    </>
  ) : null;
};
