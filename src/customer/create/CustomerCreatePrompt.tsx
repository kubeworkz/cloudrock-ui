import { FunctionComponent } from 'react';
import { Field, InjectedFormProps } from 'redux-form';

import { FieldError, SubmitButton } from '@cloudrock/form';
import {
  RadioButtonChoice,
  RadioButtonField,
} from '@cloudrock/form/RadioButtonField';
import { TranslateProps } from '@cloudrock/i18n';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import * as constants from './constants';
import './CustomerCreatePrompt.scss';
import { MessageButton } from './MessageButton';

interface CustomerCreatePromptProps extends TranslateProps, InjectedFormProps {
  renderServiceProvider: boolean;
  closeModal(): void;
  onSubmit(data: { [key: string]: string }): void;
}

export const CustomerCreatePrompt: FunctionComponent<CustomerCreatePromptProps> =
  (props) => {
    const {
      renderServiceProvider,
      translate,
      handleSubmit,
      submitting,
      error,
      onSubmit,
    } = props;

    const getColumnsNumber = () => {
      let counter = 1;
      if (renderServiceProvider) {
        counter++;
      }
      return counter;
    };

    const getColumnClassName = () => {
      const counter = getColumnsNumber();
      switch (counter) {
        case 1:
          return 'col-sm-12 single-button';
        case 2:
          return 'col-sm-6';
        case 3:
          return 'col-sm-4';
      }
    };

    const renderRadioButtons = (field) => (
      <RadioButtonField
        {...field}
        required={true}
        name={constants.FIELD_NAMES.role}
        wrapperClassName="row"
        defaultItemClassName={getColumnClassName()}
        isHiddenInput={true}
        choices={[
          new RadioButtonChoice(
            constants.ROLES.customer,
            (
              <MessageButton
                iconClass="svgfonticon svgfonticon-customer"
                title={translate('Organization')}
              >
                {translate(
                  'Become a customer of our portal. Provision IT services from the Marketplace and manage your team from one place.',
                )}
              </MessageButton>
            ),
          ),
          renderServiceProvider &&
            new RadioButtonChoice(
              constants.ROLES.provider,
              (
                <MessageButton
                  iconClass="svgfonticon svgfonticon-provider"
                  title={translate('Service Provider')}
                >
                  {translate(
                    'Register as a customer of our portal and provide your cloud services through the Marketplace.',
                  )}
                </MessageButton>
              ),
            ),
        ]}
      />
    );

    const getTitle = () => {
      const customerTitle1 = translate(
        'You do not currently have any organizations.',
      );
      const customerTitle2 = translate('Please create a new one:');
      const roleLabel = translate(
        'Please create a new one picking the profile that best matches your organization:',
      );
      return getColumnsNumber() === 1
        ? [customerTitle1, <br key={1} />, customerTitle2]
        : [customerTitle1, <br key={2} />, roleLabel];
    };

    return (
      <div className="customer-create-prompt">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalDialog
            title={getTitle()}
            footer={
              <div>
                <div className="content-center">
                  <FieldError error={error} />
                </div>
                <div className="content-center">
                  <SubmitButton
                    submitting={submitting}
                    label={translate('Create')}
                  />
                </div>
              </div>
            }
          >
            <Field
              name={constants.FIELD_NAMES.role}
              component={renderRadioButtons}
            />
          </ModalDialog>
        </form>
      </div>
    );
  };
