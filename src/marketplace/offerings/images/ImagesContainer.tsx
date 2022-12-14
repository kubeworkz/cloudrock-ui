import { useCurrentStateAndParams } from '@uirouter/react';
import { useEffect, FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { OfferingHeader } from '@cloudrock/marketplace/offerings/details/OfferingHeader';
import { loadOfferingStart } from '@cloudrock/marketplace/offerings/store/actions';
import { getOffering } from '@cloudrock/marketplace/offerings/store/selectors';
import { Offering } from '@cloudrock/marketplace/types';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';
import { RootState } from '@cloudrock/store/reducers';

import { CreateImageButton } from './CreateImageButton';
import { OfferingImagesList } from './OfferingImagesList';

const getBreadcrumbs = (offering: Offering): BreadcrumbItem[] => {
  return [
    {
      label: translate('Organization workspace'),
      state: 'organization.details',
    },
    offering.shared
      ? {
          label: translate('Public offerings'),
          state: 'marketplace-vendor-offerings',
        }
      : {
          label: translate('My offerings'),
          state: 'marketplace-my-offerings',
        },
    {
      label: offering.name,
    },
  ];
};

export const ImagesContainer: FunctionComponent = () => {
  const {
    params: { offering_uuid },
  } = useCurrentStateAndParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (offering_uuid) {
      dispatch(loadOfferingStart(offering_uuid));
    }
  }, [dispatch, offering_uuid]);

  const offering = useSelector(
    (state: RootState) => getOffering(state).offering,
  );

  useBreadcrumbsFn(
    () => (offering ? getBreadcrumbs(offering) : []),
    [offering],
  );

  useTitle(
    offering
      ? translate('Offering images ({name})', {
          name: offering.name,
        })
      : translate('Offering images'),
  );

  useSidebarKey('marketplace-services');

  if (!offering) {
    return <LoadingSpinner />;
  } else if (offering.name) {
    return (
      <>
        <Row>
          <Col lg={12}>
            <OfferingHeader offering={offering} hideName={false} />
          </Col>
        </Row>

        <CreateImageButton offering={offering} />

        <OfferingImagesList />
      </>
    );
  }
  return null;
};
