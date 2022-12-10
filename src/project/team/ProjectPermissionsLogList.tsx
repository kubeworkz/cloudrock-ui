import { connect } from 'react-redux';

import { getEventsList } from '@cloudrock/events/BaseEventsList';
import { RootState } from '@cloudrock/store/reducers';
import { getProject } from '@cloudrock/workspace/selectors';

const EVENT_TYPES = ['role_granted', 'role_revoked', 'role_updated'];

export const PureProjectPermissionsLogList = getEventsList({
  mapPropsToFilter: (props) =>
    props.project
      ? {
          scope: props.project.url,
          event_type: EVENT_TYPES,
        }
      : { event_type: EVENT_TYPES },
  mapPropsToTableId: (props) => ['project-permissions', props.project?.uuid],
});

const enhance = connect((state: RootState) => ({
  project: getProject(state),
}));

export const ProjectPermissionsLogList = enhance(PureProjectPermissionsLogList);
