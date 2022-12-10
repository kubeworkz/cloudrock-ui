import { FunctionComponent, useContext } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Field, formValueSelector } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { FormFieldsContext, FormLayoutContext } from '@cloudrock/form/context';
import { withTranslation, TranslateProps } from '@cloudrock/i18n';
import { FORM_ID } from '@cloudrock/marketplace/offerings/store/constants';

import { DisplayNameField } from '../DisplayNameField';
import { FormGroup } from '../FormGroup';
import { InternalNameField } from '../InternalNameField';

import { FIELD_TYPES } from './constants';
import { FieldType } from './types';

const selector = formValueSelector(FORM_ID);

const connector = connect<{ type?: string }, {}, { option: string }>(
  (state, ownProps) => {
    const option = selector(state, ownProps.option);
    if (option.type) {
      return { type: option.type.value };
    } else {
      return {};
    }
  },
);

const StringField: FunctionComponent<any> = (props) => (
  <Field
    name={`${props.option}.${props.name}`}
    type="text"
    className="form-control"
    component="input"
    validate={props.validate}
    readOnly={props.readOnly}
  />
);

const RequiredField = withTranslation(
  (props: TranslateProps & { option: string; readOnly?: boolean }) => (
    <Field
      name={`${props.option}.required`}
      component={AwesomeCheckboxField}
      label={props.translate('Required')}
      disabled={props.readOnly}
    />
  ),
);

const OptionTypeField: FunctionComponent<any> = (props) => (
  <Field
    name={`${props.option}.type`}
    validate={props.validate}
    component={(fieldProps) => (
      <Select
        value={fieldProps.input.value}
        onChange={(value) => fieldProps.input.onChange(value)}
        options={FIELD_TYPES}
        isClearable={false}
        isDisabled={props.readOnly}
      />
    )}
  />
);

const MinMaxFields = withTranslation(
  (props: TranslateProps & { option: string; readOnly?: boolean }) => (
    <>
      <FormGroup label={props.translate('Minimal value')}>
        <Field
          name={`${props.option}.min`}
          type="number"
          className="form-control"
          component="input"
          readOnly={props.readOnly}
        />
      </FormGroup>
      <FormGroup label={props.translate('Maximal value')}>
        <Field
          name={`${props.option}.max`}
          type="number"
          className="form-control"
          component="input"
          readOnly={props.readOnly}
        />
      </FormGroup>
    </>
  ),
);

interface OptionFormProps extends TranslateProps {
  option: string;
  type: FieldType;
  readOnly?: boolean;
}

export const OptionForm = connector(
  withTranslation((props: OptionFormProps) => {
    const { layout } = useContext(FormLayoutContext);
    const fieldsClassNames = {
      labelClassName: layout === 'vertical' ? 'control-label' : undefined,
      valueClassName: layout === 'vertical' ? '' : undefined,
      classNameWithoutLabel: layout === 'vertical' ? '' : undefined,
    };
    return (
      <FormFieldsContext.Provider value={fieldsClassNames}>
        <InternalNameField
          name={`${props.option}.name`}
          readOnly={props.readOnly}
        />
        <DisplayNameField
          name={`${props.option}.label`}
          readOnly={props.readOnly}
        />
        <FormGroup label={props.translate('Description')}>
          <StringField
            option={props.option}
            name="help_text"
            readOnly={props.readOnly}
          />
        </FormGroup>
        <FormGroup label={props.translate('Type')} required={true}>
          <OptionTypeField
            option={props.option}
            validate={required}
            readOnly={props.readOnly}
          />
        </FormGroup>
        {(props.type === 'integer' || props.type === 'money') && (
          <MinMaxFields option={props.option} readOnly={props.readOnly} />
        )}
        {(props.type === 'select_string' ||
          props.type === 'select_string_multi') && (
          <FormGroup
            label={props.translate('Choices as comma-separated list')}
            required={true}
          >
            <StringField
              option={props.option}
              name="choices"
              validate={required}
              readOnly={props.readOnly}
            />
          </FormGroup>
        )}
        {props.type === 'string' && (
          <FormGroup label={props.translate('Default value')}>
            <StringField
              option={props.option}
              name="default"
              readOnly={props.readOnly}
            />
          </FormGroup>
        )}
        <FormGroup>
          <RequiredField option={props.option} readOnly={props.readOnly} />
        </FormGroup>
      </FormFieldsContext.Provider>
    );
  }),
);
