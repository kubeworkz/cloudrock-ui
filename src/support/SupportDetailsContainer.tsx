import { useCurrentStateAndParams, useRouter } from '@uirouter/react';
import { useEffect, FunctionComponent } from 'react';
import { useAsyncFn } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getIssue } from '@cloudrock/issues/api';
import {
  getResource,
  getOrderItemList,
  getResourceOffering,
} from '@cloudrock/marketplace/common/api';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';

import { SupportDetails } from './SupportDetails';

const getBreadcrumbs = (resource: Resource): BreadcrumbItem[] => {
  const items = [
    {
      label: translate('Project workspace'),
      state: 'project.details',
      params: {
        uuid: resource.project_uuid,
      },
    },
    {
      label: translate('Resources'),
    },
  ];
  if (resource.category_title) {
    const params = {
      category_uuid: resource.category_uuid,
      uuid: resource.project_uuid,
    };
    items.push({
      label: resource.category_title,
      state: 'marketplace-project-resources',
      params,
    });
  }
  return items;
};

const loadData = async (resource_uuid: string) => {
  const resource = await getResource(resource_uuid);
  const offering = await getResourceOffering(resource_uuid);
  const orderItems = await getOrderItemList({
    type: 'Create',
    resource_uuid: resource.uuid,
  });
  const orderItem = orderItems.length === 1 ? orderItems[0] : null;
  const issue = orderItem?.issue?.uuid
    ? await getIssue(orderItem.issue.uuid)
    : undefined;
  return {
    resource,
    offering,
    issue,
  };
};

export const SupportDetailsContainer: FunctionComponent = () => {
  const {
    params: { resource_uuid },
  } = useCurrentStateAndParams();

  const [{ loading, error, value }, reInitResource] = useAsyncFn(
    () => loadData(resource_uuid),
    [resource_uuid],
  );

  useTitle(value ? value.resource.name : translate('Request details'));

  useBreadcrumbsFn(
    () => (value ? getBreadcrumbs(value.resource) : []),
    [value],
  );

  const router = useRouter();

  useEffect(() => {
    if (!resource_uuid) {
      router.stateService.go('errorPage.notFound');
    } else {
      reInitResource();
    }
  }, [resource_uuid, router.stateService, reInitResource]);

  useEffect(() => {
    if ((error as any)?.status === 404) {
      router.stateService.go('errorPage.notFound');
    }
  }, [error, router.stateService]);

  useSidebarKey('marketplace-project-resources');

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <>{translate('Unable to load data.')}</>
  ) : value ? (
    <SupportDetails
      resource={value.resource}
      reInitResource={reInitResource}
      summary={value.offering.full_description}
      issue={value.issue}
    />
  ) : null;
};
