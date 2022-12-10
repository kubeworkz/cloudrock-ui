import eventsRegistry from '@cloudrock/events/registry';
import { getProjectContext } from '@cloudrock/events/utils';
import { gettext } from '@cloudrock/i18n';

eventsRegistry.registerGroup({
  title: gettext('Project events'),
  context: getProjectContext,
  events: [
    {
      key: 'project_creation_succeeded',
      title: gettext('Project {project_link} has been created.'),
    },
    {
      key: 'project_deletion_succeeded',
      title: gettext('Project {project_name} has been deleted.'),
    },
    {
      key: 'project_name_update_succeeded',
      title: gettext(
        'Project has been renamed from {project_previous_name} to {project_link}.',
      ),
    },
    {
      key: 'project_update_succeeded',
      title: gettext('Project {project_link} has been updated.'),
    },
  ],
});
