import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import { FormLayoutContext } from '@cloudrock/form/context';
import { translate } from '@cloudrock/i18n';
import {
  parseIntField,
  formatIntField,
} from '@cloudrock/marketplace/common/utils';
import { OfferingComponent } from '@cloudrock/marketplace/types';

interface OfferingLimitsTableProps {
  components: OfferingComponent[];
}

export const OfferingLimitsTable: React.FC<OfferingLimitsTableProps> = (
  props,
) => {
  const { layout } = useContext(FormLayoutContext);

  const col = layout === 'vertical' ? 0 : 8;
  const offset = layout === 'vertical' ? 0 : 2;

  return (
    <div className="form-group">
      <Col smOffset={offset} sm={col} className="m-b-sm">
        <p className="form-control-static">
          <strong>{translate('Offering components')}</strong>
        </p>
      </Col>
      <Col smOffset={offset} sm={col}>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>{translate('Name')}</th>
              <th>{translate('Min amount')}</th>
              <th>{translate('Max amount')}</th>
            </tr>
          </thead>
          <tbody>
            {props.components.map((component, index) => (
              <tr key={index}>
                <td>
                  <div className="form-control-static">{component.name}</div>
                </td>
                <td>
                  <Field
                    component="input"
                    min={0}
                    className="form-control"
                    name={`limits.${component.type}.min`}
                    type="number"
                    parse={parseIntField}
                    format={formatIntField}
                  />
                </td>
                <td>
                  <Field
                    component="input"
                    min={0}
                    className="form-control"
                    name={`limits.${component.type}.max`}
                    type="number"
                    parse={parseIntField}
                    format={formatIntField}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </div>
  );
};
