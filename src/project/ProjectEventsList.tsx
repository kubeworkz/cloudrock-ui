import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import { isEmpty } from '@cloudrock/core/utils';
import { getEventsList } from '@cloudrock/events/BaseEventsList';
import { RootState } from '@cloudrock/store/reducers';
import { getProject } from '@cloudrock/workspace/selectors';

import { ProjectEventsFilter } from './ProjectEventsFilter';

export const PureProjectEvents = getEventsList({
  mapPropsToFilter: (props) => {
    const filter = {
      ...props.userFilter,
    };
    if (props.project) {
      filter.scope = props.project.url;
    }
    if (props.userFilter && isEmpty(props.userFilter.feature)) {
      filter.feature = ['projects', 'resources'];
    }
    return filter;
  },
  mapPropsToTableId: (props) => ['project-events', props.project?.uuid],
});

const mapStateToProps = (state: RootState) => ({
  userFilter: getFormValues('projectEventsFilter')(state),
  project: getProject(state),
});

const ProjectEvents = connect(mapStateToProps)(PureProjectEvents);

export const ProjectEventsView: FunctionComponent<any> = (props) => (
  <>
    <ProjectEventsFilter />
    <ProjectEvents {...props} />
  </>
);
