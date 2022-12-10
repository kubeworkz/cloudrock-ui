import { useCurrentStateAndParams } from '@uirouter/react';
import { useState, useEffect, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { Layout } from '@cloudrock/navigation/Layout';
import { getProject } from '@cloudrock/workspace/selectors';

import { ProjectSidebar } from './ProjectSidebar';

function getBreadcrumbs(project, state): BreadcrumbItem[] {
  if (project) {
    const items: BreadcrumbItem[] = [
      {
        label: translate('Project workspace'),
        state: 'project.details',
        params: {
          uuid: project.uuid,
        },
      },
    ];
    if (state.name.includes('resources')) {
      items.push({
        label: translate('Resources'),
      });
    }
    return items;
  }
}

export const ProjectWorkspace: FunctionComponent = () => {
  const [pageClass, setPageClass] = useState<string>();
  const [hideBreadcrumbs, setHideBreadcrumbs] = useState<boolean>();
  const project = useSelector(getProject);
  const { state, params } = useCurrentStateAndParams();

  function refreshState() {
    const data = state?.data;
    setPageClass(data?.pageClass);
    setHideBreadcrumbs(data?.hideBreadcrumbs);
  }
  useBreadcrumbsFn(() => getBreadcrumbs(project, state), [project, state]);

  useEffect(refreshState, [state, params]);

  return (
    <Layout
      sidebar={<ProjectSidebar />}
      pageClass={pageClass}
      hideBreadcrumbs={hideBreadcrumbs}
    />
  );
};
