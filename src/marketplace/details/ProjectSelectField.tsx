import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Field, change, FormAction } from 'redux-form';

import { setCurrentProject } from '@cloudrock/workspace/actions';
import { Project } from '@cloudrock/workspace/types';

const PureProjectSelectField: FunctionComponent<any> = (props) => (
  <Field
    name="project"
    component={(fieldProps) => (
      <Select
        value={fieldProps.input.value}
        onChange={(value) => {
          fieldProps.input.onChange(value);
          props.setCurrentProject(value);
        }}
        getOptionValue={(option) => option.url}
        getOptionLabel={(option) => option.name}
        options={props.projects}
        isClearable={false}
      />
    )}
  />
);

const mapDispatchToProps = {
  setCurrentProject,
  change,
};

const connector = connect<
  {},
  {
    setCurrentProject(project: Project): void;
    change(form: string, field: string, value: any): FormAction;
  },
  { projects: Project[] }
>(undefined, mapDispatchToProps);

export const ProjectSelectField = connector(PureProjectSelectField);
