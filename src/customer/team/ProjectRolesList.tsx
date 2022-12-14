import { Fragment, FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';

export const ProjectRolesList: FunctionComponent<{ roleName; row }> = ({
  roleName,
  row,
}) => {
  const filteredProjects = row.projects.filter(
    (item) => item.role === roleName,
  );
  if (filteredProjects.length === 0) {
    return <>{translate('No projects are assigned to this user.')}</>;
  }
  return (
    <>
      {filteredProjects.map((item, index) => {
        return (
          <Fragment key={index}>
            <Link
              state="project.details"
              params={{ uuid: item.uuid }}
              label={item.name}
            />
            {index === filteredProjects.length - 1 ? null : ', '}
          </Fragment>
        );
      })}
    </>
  );
};
