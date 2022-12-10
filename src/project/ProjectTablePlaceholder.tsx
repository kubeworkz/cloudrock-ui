import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_organizing_projects.svg');

export const ProjectTablePlaceholder: FunctionComponent = () => (
  <ImageTablePlaceholder
    illustration={Illustration}
    title={translate(`Your organization does not have any projects yet.`)}
    description={translate(
      `Project aggregates and isolates teams and resources.`,
    )}
    action={
      <Link
        state="organization.createProject"
        className="btn btn-success btn-md"
      >
        {translate('Create your first project')}
      </Link>
    }
  />
);
