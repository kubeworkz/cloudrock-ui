import { Col, Row } from 'react-bootstrap';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { CategoriesListType } from '@cloudrock/marketplace/types';

import { CategoryCard } from './CategoryCard';

interface CategoriesListProps extends TranslateProps, CategoriesListType {}

export const CategoriesList = withTranslation((props: CategoriesListProps) => {
  if (props.loading) {
    return <LoadingSpinner />;
  }

  if (!props.loaded) {
    return (
      <h3 className="text-center">
        {props.translate('Unable to load categories.')}
      </h3>
    );
  }

  if (!props.items) {
    return (
      <h3 className="text-center">
        {props.translate('There are no categories in marketplace yet.')}
      </h3>
    );
  }

  return (
    <Row>
      {props.items.map((category, index) =>
        category.offering_count !== 0 ? (
          <Col key={index} md={2} sm={6}>
            <CategoryCard category={category} />
          </Col>
        ) : null,
      )}
    </Row>
  );
});
