import { useCurrentStateAndParams } from '@uirouter/react';
import { useState, useEffect, FunctionComponent } from 'react';
import { useEffectOnce } from 'react-use';

import { translate } from '@cloudrock/i18n';
import { setBreadcrumbs } from '@cloudrock/navigation/breadcrumbs/store';
import { Layout } from '@cloudrock/navigation/Layout';
import { router } from '@cloudrock/router';
import store from '@cloudrock/store/store';
import { setCurrentWorkspace, setCurrentUser } from '@cloudrock/workspace/actions';
import { USER_WORKSPACE } from '@cloudrock/workspace/types';

import { UserSidebar } from './UserSidebar';
import { UsersService, getCurrentUser } from './UsersService';

function loadUser() {
  getCurrentUser().then(function (currentUser) {
    if (
      router.globals.params.uuid === undefined ||
      router.globals.params.uuid === currentUser.uuid
    ) {
      store.dispatch(setCurrentWorkspace(USER_WORKSPACE));
      store.dispatch(setCurrentUser(currentUser));
      store.dispatch(setBreadcrumbs([{ label: translate('User dashboard') }]));
    } else if (currentUser.is_staff || currentUser.is_support) {
      UsersService.get(router.globals.params.uuid)
        .then(function (user) {
          store.dispatch(setCurrentUser(user));
          store.dispatch(setCurrentWorkspace(USER_WORKSPACE));
          store.dispatch(setBreadcrumbs([{ label: user.full_name }]));
        })
        .catch(function (response) {
          if (response.status === 404) {
            router.stateService.go('errorPage.notFound');
          }
        });
    } else {
      router.stateService.go('errorPage.notFound');
    }
  });
}

export const UserDetails: FunctionComponent = () => {
  const [pageClass, setPageClass] = useState<string>();
  const [hideBreadcrumbs, setHideBreadcrumbs] = useState<boolean>();
  const { state, params } = useCurrentStateAndParams();

  function refreshState() {
    const data = state?.data;
    setPageClass(data?.pageClass);
    setHideBreadcrumbs(data?.hideBreadcrumbs);
  }

  useEffectOnce(() => {
    loadUser();
  });
  useEffect(refreshState, [state, params]);

  return (
    <Layout
      sidebar={<UserSidebar />}
      pageClass={pageClass}
      hideBreadcrumbs={hideBreadcrumbs}
    />
  );
};
