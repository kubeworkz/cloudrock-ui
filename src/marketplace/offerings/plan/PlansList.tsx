import { FunctionComponent, useContext } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { FormLayoutContext } from '@cloudrock/form/context';
import { translate } from '@cloudrock/i18n';
import { hidePlanAddButton } from '@cloudrock/marketplace/common/registry';
import { RootState } from '@cloudrock/store/reducers';

import { PlanAddButton } from './PlanAddButton';
import { PlanPanel } from './PlanPanel';

const PlansListComponent: FunctionComponent<any> = (props) => {
  const { layout } = useContext(FormLayoutContext);

  const col = layout === 'vertical' ? 0 : 8;
  const offset = layout === 'vertical' ? 0 : 2;

  return (
    <div className="form-group">
      <Col smOffset={offset} sm={col} className="m-b-sm">
        <p className="form-control-static">
          <strong>{translate('Accounting plans')}</strong>
        </p>
      </Col>

      <Col smOffset={offset} sm={col}>
        {props.fields.map((plan, index) => (
          <PlanPanel
            key={index}
            plan={plan}
            index={index}
            onRemove={props.fields.remove}
          />
        ))}

        {!hidePlanAddButton(props.selectedProvider.value, props.fields) && (
          <PlanAddButton onClick={() => props.fields.push({})} />
        )}
      </Col>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedProvider: state.form.marketplaceOfferingCreate.values.type,
});

export const PlansList = connect(mapStateToProps, null)(PlansListComponent);
