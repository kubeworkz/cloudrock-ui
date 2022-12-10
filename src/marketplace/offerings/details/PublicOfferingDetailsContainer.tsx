import { useCurrentStateAndParams } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncFn, useEffectOnce } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { InvalidRoutePage } from '@cloudrock/error/InvalidRoutePage';
import { translate } from '@cloudrock/i18n';
import {
  getPublicOffering,
  getCategory,
  getPlugins,
  getCategories,
} from '@cloudrock/marketplace/common/api';
import { PublicOfferingDetails } from '@cloudrock/marketplace/offerings/details/PublicOfferingDetails';
import * as actions from '@cloudrock/marketplace/offerings/store/actions';
import { filterPluginsData } from '@cloudrock/marketplace/offerings/store/utils';
import { AnonymousHeader } from '@cloudrock/navigation/AnonymousHeader';
import { useTitle } from '@cloudrock/navigation/title';
import { getCustomer } from '@cloudrock/project/api';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';
import { getCurrentUser } from '@cloudrock/user/UsersService';
import { setCurrentCustomer, setCurrentUser } from '@cloudrock/workspace/actions';

export const PublicOfferingDetailsContainer: FunctionComponent = () => {
  const dispatch = useDispatch();

  const {
    params: { uuid },
  } = useCurrentStateAndParams();

  const [{ loading, error, value }, refreshOffering] = useAsyncFn(async () => {
    try {
      const user = await getCurrentUser({ __skipLogout__: true });
      dispatch(setCurrentUser(user));
      const offering = await getPublicOffering(uuid);
      const category = await getCategory(offering.category_uuid);
      const categories = await getCategories();
      const pluginsData = await getPlugins();
      const plugins = filterPluginsData(pluginsData);
      dispatch(
        actions.loadDataSuccess({
          offering,
          categories,
          plugins,
        }),
      );
      const customer = await getCustomer(offering.customer_uuid);
      dispatch(setCurrentCustomer(customer));
      return { offering, category };
    } catch (e) {
      if (e.response.status == 401) {
        const offering = await getPublicOffering(uuid, ANONYMOUS_CONFIG);
        const category = await getCategory(
          offering.category_uuid,
          ANONYMOUS_CONFIG,
        );
        const categories = await getCategories(ANONYMOUS_CONFIG);
        dispatch(
          actions.loadDataSuccess({
            offering,
            categories,
          }),
        );
        return { offering, category };
      }
    }
  }, [uuid]);

  useEffectOnce(() => {
    refreshOffering();
  });

  useTitle(
    value?.offering ? value.offering.name : translate('Offering details'),
  );

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <h3>{translate('Unable to load offering details.')}</h3>
  ) : value ? (
    <>
      <AnonymousHeader />
      <PublicOfferingDetails
        offering={value.offering}
        refreshOffering={refreshOffering}
        category={value.category}
      />
    </>
  ) : (
    <InvalidRoutePage />
  );
};
