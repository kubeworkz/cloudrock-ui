import { FallbackRender } from '@sentry/react/dist/errorboundary';
import { Button } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_fixing_bugs_w7gi.svg');

export const ErrorMessage: FallbackRender = (props) => (
  <>
    <ImageTablePlaceholder
      illustration={Illustration}
      title={translate(`An error has occurred.`)}
      description={props.error.message}
      action={
        <Button onClick={() => location.reload()} bsStyle="success">
          <i className="fa fa-refresh" /> {translate('Reload')}
        </Button>
      }
    />
    <pre className="m-t-md">{props.componentStack}</pre>
  </>
);
