import { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';

import { EnvironmentVariableAddButton } from './EnvironmentVariableAddButton';
import { EnvironmentVariablePanel } from './EnvironmentVariablePanel';

export const EnvironmentVariablesList: FunctionComponent<any> = (props) => (
  <div className="form-group">
    <Col smOffset={2} sm={8} className="m-b-sm">
      <p className="form-control-static">
        <strong>{translate('Environment variables')}</strong>
      </p>
    </Col>

    <Col smOffset={2} sm={8}>
      {props.fields.map((variable, index) => (
        <EnvironmentVariablePanel
          key={index}
          variable={variable}
          index={index}
          onRemove={props.fields.remove}
        />
      ))}
      <EnvironmentVariableAddButton onClick={() => props.fields.push({})} />
    </Col>
  </div>
);
