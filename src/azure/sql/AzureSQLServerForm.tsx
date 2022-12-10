import React from 'react';

import { sqlServerName } from '@cloudrock/azure/common/validators';
import { required } from '@cloudrock/core/validators';
import { FormContainer, StringField, TextField } from '@cloudrock/form';
import { AsyncSelectField } from '@cloudrock/form/AsyncSelectField';
import { translate } from '@cloudrock/i18n';
import { ProjectField } from '@cloudrock/marketplace/details/ProjectField';
import { OfferingConfigurationFormProps } from '@cloudrock/marketplace/types';

import { loadLocationOptions } from '../vm/utils';

export const AzureSQLServerForm: React.FC<OfferingConfigurationFormProps> = (
  props,
) => {
  return (
    <form className="form-horizontal">
      <FormContainer
        submitting={false}
        labelClass="col-sm-3"
        controlClass="col-sm-9"
      >
        <ProjectField />
        <StringField
          label={translate('SQL server name')}
          name="attributes.name"
          description={translate(
            'This name will be visible in accounting data.',
          )}
          validate={[required, sqlServerName]}
          required={true}
        />
        <AsyncSelectField
          name="attributes.location"
          label={translate('Location')}
          required={true}
          loadOptions={(query, prevOptions, currentPage) =>
            loadLocationOptions(
              props.offering.scope_uuid,
              query,
              prevOptions,
              currentPage,
            )
          }
        />
        <TextField
          label={translate('SQL server description')}
          name="attributes.description"
        />
      </FormContainer>
    </form>
  );
};
