import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';
import { Division } from '@cloudrock/marketplace/types';

interface PureAttributeFilterDivisionProps {
  divisions: Division[];
}

export const AttributeFilterDivision: FunctionComponent<PureAttributeFilterDivisionProps> =
  (props) => (
    <section className="m-t-md m-b-md">
      <h3 className="division-title">{translate('Divisions')}</h3>
      {props.divisions.map((division: Division) => (
        <Field
          name={`division-${division.type}`}
          key={division.uuid}
          component={AwesomeCheckboxField}
          label={division.name}
        />
      ))}
    </section>
  );
