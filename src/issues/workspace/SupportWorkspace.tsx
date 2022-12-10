import { useCurrentStateAndParams } from '@uirouter/react';
import { useEffect, useState, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import {
  setBreadcrumbs,
  useBreadcrumbsFn,
} from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { Layout } from '@cloudrock/navigation/Layout';
import { setCurrentWorkspace } from '@cloudrock/workspace/actions';
import { SUPPORT_WORKSPACE } from '@cloudrock/workspace/types';

import { IssueNavigationService } from './IssueNavigationService';
import { SupportSidebar } from './SupportSidebar';

function getBreadcrumbs(): BreadcrumbItem[] {
  return [
    {
      label: translate('Support dashboard'),
      action: () => IssueNavigationService.gotoDashboard(),
    },
  ];
}

export function useReportingBreadcrumbs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        ...getBreadcrumbs(),
        {
          label: translate('Reporting'),
        },
      ]),
    );
    return () => {
      dispatch(setBreadcrumbs(getBreadcrumbs()));
    };
  });
}

export const SupportWorkspace: FunctionComponent = () => {
  const [pageClass, setPageClass] = useState<string>();
  const [hideBreadcrumbs, setHideBreadcrumbs] = useState<boolean>();
  const { state, params } = useCurrentStateAndParams();
  const dispatch = useDispatch();

  function refreshState() {
    const data = state?.data;
    setPageClass(data?.pageClass);
    setHideBreadcrumbs(data?.hideBreadcrumbs);
  }

  useBreadcrumbsFn(getBreadcrumbs, []);

  useEffect(() => {
    dispatch(setCurrentWorkspace(SUPPORT_WORKSPACE));
  }, [dispatch]);

  useEffect(refreshState, [state, params]);

  return (
    <Layout
      sidebar={<SupportSidebar />}
      pageClass={pageClass}
      hideBreadcrumbs={hideBreadcrumbs}
    />
  );
};
