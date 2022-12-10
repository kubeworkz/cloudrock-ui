import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { generateColors } from '@cloudrock/customer/divisions/utils';
import { translate } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { ResourceMetaInfo } from '@cloudrock/marketplace/resources/usage/ResourceMetaInfo';
import { ResourceUsageTabs } from '@cloudrock/marketplace/resources/usage/ResourceUsageTabs';

import { getComponentsAndUsages } from './api';

interface ResourceUsageTabsContainerProps {
  resource: Resource;
}

export const ResourceUsageTabsContainer: FunctionComponent<ResourceUsageTabsContainerProps> =
  ({ resource }) => {
    const { loading, error, value } = useAsync(
      () => getComponentsAndUsages(resource.resource_uuid),
      [resource],
    );
    return loading ? (
      <LoadingSpinner />
    ) : error ? (
      <>{translate('Unable to load data')}</>
    ) : !value.components.length ? (
      <h3>{translate('Offering does not have any usage-based components.')}</h3>
    ) : (
      <>
        <ResourceMetaInfo resource={resource} />
        <ResourceUsageTabs
          components={value.components}
          usages={value.usages}
          colors={generateColors(value.components.length, {
            colorStart: 0.25,
            colorEnd: 0.65,
            useEndAsStart: true,
          })}
        />
      </>
    );
  };
