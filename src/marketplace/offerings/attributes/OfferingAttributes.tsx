import React from 'react';
import { Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import { AwesomeCheckbox } from '@cloudrock/core/AwesomeCheckbox';
import { FieldError } from '@cloudrock/form';
import { Section } from '@cloudrock/marketplace/types';

import { configAttrField } from './utils';

interface OfferingAttributesProps {
  sections: Section[];
  labelCols?: number;
  controlCols?: number;
}

export const OfferingAttributes: React.FC<OfferingAttributesProps> = (
  props,
) => (
  <>
    {props.sections.map((section, sectionIndex) => (
      <div key={sectionIndex}>
        <div className="form-group">
          <Col smOffset={props.labelCols} sm={props.controlCols}>
            <p className="form-control-static">
              <strong>{section.title}</strong>
            </p>
          </Col>
        </div>
        {section.attributes.map((attribute, attributeIndex) => {
          if (attribute.type === 'boolean') {
            return (
              <div className="form-group" key={attributeIndex}>
                <Col smOffset={props.labelCols} sm={props.controlCols}>
                  <Field
                    name={`attributes.${attribute.key}`}
                    component={(prop) => (
                      <AwesomeCheckbox
                        label={attribute.title}
                        {...prop.input}
                      />
                    )}
                  />
                </Col>
              </div>
            );
          }
          const attr = configAttrField(attribute);
          return (
            <div className="form-group" key={attributeIndex}>
              <Col
                className="control-label"
                sm={props.labelCols}
                componentClass="label"
              >
                {attribute.title}
              </Col>
              <Col sm={props.controlCols}>
                <Field
                  key={attributeIndex}
                  name={`attributes.${attribute.key}`}
                  component="input"
                  className="form-control"
                  {...attr}
                />
                <Field
                  name={`attributes.${attribute.key}`}
                  {...attr}
                  component={(fieldProps) => (
                    <FieldError error={fieldProps.meta.error} />
                  )}
                />
              </Col>
            </div>
          );
        })}
      </div>
    ))}
  </>
);

OfferingAttributes.defaultProps = {
  labelCols: 3,
  controlCols: 5,
};
