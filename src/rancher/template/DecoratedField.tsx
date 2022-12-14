import React from 'react';
import { Col, FormGroup, HelpBlock } from 'react-bootstrap';
import { Field, WrappedFieldProps } from 'redux-form';

import { required } from '@cloudrock/core/validators';

import { FieldProps } from '../types';

import { DecoratedLabel } from './DecoratedLabel';

interface OwnProps extends FieldProps {
  component: React.ComponentType<WrappedFieldProps>;
  action?: React.ReactNode;
  validate?: any;
}

export const DecoratedField: React.FC<OwnProps> = (props) => (
  <Col sm={6}>
    <FormGroup>
      {props.action ? (
        <div className="pull-right">
          <small>{props.action}</small>
        </div>
      ) : null}
      <p>
        <DecoratedLabel label={props.label} required={props.required} />
      </p>
      <Field
        name={props.variable}
        component={props.component}
        validate={
          props.validate
            ? props.validate
            : props.required
            ? required
            : undefined
        }
      />
      <HelpBlock>
        <span className="text-muted">{props.description}</span>
      </HelpBlock>
    </FormGroup>
  </Col>
);
