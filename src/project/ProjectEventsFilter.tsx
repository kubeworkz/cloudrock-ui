import { FunctionComponent } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { translate, withTranslation } from '@cloudrock/i18n';
import { ToogleButtonFilter } from '@cloudrock/table/ToggleButtonFilter';

const PureProjectEventsFilter: FunctionComponent = () => (
  <Field
    name="feature"
    component={(props) => (
      <ToogleButtonFilter
        choices={[
          {
            label: translate('Project events'),
            value: 'projects',
          },
          {
            label: translate('Resource events'),
            value: 'resources',
          },
        ]}
        {...props.input}
      />
    )}
  />
);

const enhance = compose(
  reduxForm({
    form: 'projectEventsFilter',
    initialValues: {
      feature: ['projects'],
    },
  }),
  withTranslation,
);

export const ProjectEventsFilter = enhance(PureProjectEventsFilter);
